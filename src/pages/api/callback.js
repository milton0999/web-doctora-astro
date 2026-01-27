function renderBody(status, content) {
  return `
    <script>
      const receiveMessage = (message) => {
        window.opener.postMessage(
          'authorization:github:${status}:${JSON.stringify(content)}',
          message.origin
        );
        window.removeEventListener("message", receiveMessage, false);
      }
      window.addEventListener("message", receiveMessage, false);
      window.opener.postMessage("authorizing:github", "*");
    </script>
  `;
}

export const GET = async ({ request, locals }) => {
  // En Astro con Cloudflare, las variables están en locals.runtime.env
  const client_id = locals.runtime.env.GITHUB_CLIENT_ID;
  const client_secret = locals.runtime.env.GITHUB_CLIENT_SECRET;

  try {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');

    const response = await fetch(
      'https://github.com/login/oauth/access_token',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'user-agent': 'astro-github-oauth',
          'accept': 'application/json',
        },
        body: JSON.stringify({ client_id, client_secret, code }),
      }
    );

    const result = await response.json();

    if (result.error) {
      return new Response(renderBody('error', result), {
        headers: { 'content-type': 'text/html;charset=UTF-8' },
        status: 401 
      });
    }

    const responseBody = renderBody('success', {
      token: result.access_token,
      provider: 'github',
    });

    return new Response(responseBody, { 
      headers: { 'content-type': 'text/html;charset=UTF-8' },
      status: 200 
    });

  } catch (error) {
    return new Response(error.message, {
      headers: { 'content-type': 'text/html;charset=UTF-8' },
      status: 500,
    });
  }
};