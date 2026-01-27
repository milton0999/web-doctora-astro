export const GET = async ({ url, locals }) => {
  const GITHUB_CLIENT_ID = locals.runtime.env.GITHUB_CLIENT_ID;
  
  // URL de GitHub para pedir autorización
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=repo,user`;

  return new Response(null, {
    status: 302,
    headers: {
      Location: githubAuthUrl,
    },
  });
};