export async function onRequest(context) {
    const {
        request, // same as existing Worker API
        env, // same as existing Worker API
        params, // if filename includes [id] or [[path]]
        waitUntil, // same as ctx.waitUntil in existing Worker API
        next, // used for middleware or fetch assets
        data, // arbitrary space for passing data between middlewares
    } = context;

    const client_id = env.GITHUB_CLIENT_ID;
    
    // Debug logging
    console.log('Environment variables check:', {
        has_client_id: !!client_id,
        has_secret: !!env.GITHUB_CLIENT_SECRET,
        client_id_prefix: client_id ? client_id.substring(0, 8) + '...' : 'undefined'
    });

    try {
        const url = new URL(request.url);
        const redirectUrl = new URL('https://github.com/login/oauth/authorize');
        redirectUrl.searchParams.set('client_id', client_id);
        redirectUrl.searchParams.set('redirect_uri', url.origin + '/api/callback');
        redirectUrl.searchParams.set('scope', 'repo user');
        redirectUrl.searchParams.set(
            'state',
            Array.from(crypto.getRandomValues(new Uint8Array(12)))
                .map(b => b.toString(16).padStart(2, '0'))
                .join('')
        );
        return Response.redirect(redirectUrl.href, 301);

    } catch (error) {
        console.error(error);
        return new Response(error.message, {
            status: 500,
        });
    }
}