export const GET = async (context) => {
    const { request, env } = context;
    const client_id = env.GITHUB_CLIENT_ID;
    const kv = env.SESSION;

    try {
        const url = new URL(request.url);
        const redirectUrl = new URL('https://github.com/login/oauth/authorize');
        redirectUrl.searchParams.set('client_id', client_id);
        redirectUrl.searchParams.set('redirect_uri', url.origin + '/api/callback');
        redirectUrl.searchParams.set('scope', 'repo user');
        
        const stateBytes = crypto.getRandomValues(new Uint8Array(16));
        const state = Array.from(stateBytes).map(b => b.toString(16).padStart(2, '0')).join('');
        
        await kv.put(state, 'valid', { expirationTtl: 600 });
        
        redirectUrl.searchParams.set('state', state);
        return Response.redirect(redirectUrl.href, 302);
    } catch (error) {
        console.error('Auth error:', error);
        return new Response(error.message, { status: 500 });
    }
}
