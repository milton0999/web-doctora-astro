export const prerender = false;

export async function GET({ request }: { request: Request }) {
  const url = new URL(request.url);
  const token = url.searchParams.get('token');

  if (!token) {
    return new Response(JSON.stringify({ error: 'Token requerido' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Verificar el token con GitHub
  try {
    const response = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'Token inválido' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const user = await response.json();

    return new Response(JSON.stringify({ 
      token,
      user: {
        login: user.login,
        name: user.name,
        avatar_url: user.avatar_url
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al verificar token' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}