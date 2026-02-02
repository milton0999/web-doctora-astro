function renderBody(status, content) {
    const html = `<script>
      const receiveMessage = (message) => {
        window.opener.postMessage('authorization:github:${status}:${JSON.stringify(content)}', message.origin);
        window.removeEventListener("message", receiveMessage, false);
      }
      window.addEventListener("message", receiveMessage, false);
      window.opener.postMessage("authorizing:github", "*");
    </script>`;
    return new Blob([html]);
}

export const GET = async (context) => {
    const { request, env } = context;
    const client_id = env.GITHUB_CLIENT_ID;
    const client_secret = env.GITHUB_CLIENT_SECRET;
    const kv = env.SESSION;

    try {
        const url = new URL(request.url);
        const code = url.searchParams.get('code');
        const state = url.searchParams.get('state');

        const stateValid = await kv.get(state);
        
        if (!stateValid) {
            return new Response(renderBody('error', { error: 'Invalid state parameter' }), {
                headers: { 'content-type': 'text/html;charset=UTF-8' },
                status: 401 
            });
        }

        await kv.delete(state);

        const response = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: { 'content-type': 'application/json', 'accept': 'application/json' },
            body: JSON.stringify({ client_id, client_secret, code }),
        });
        const result = await response.json();
        
        if (result.error) {
            return new Response(renderBody('error', result), {
                headers: { 'content-type': 'text/html;charset=UTF-8' },
                status: 401 
            });
        }
        
        return new Response(renderBody('success', { token: result.access_token, provider: 'github' }), {
            headers: { 'content-type': 'text/html;charset=UTF-8' },
            status: 200 
        });
    } catch (error) {
        console.error('Callback error:', error);
        return new Response(error.message, { status: 500 });
    }
}
