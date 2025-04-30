import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const code = request.nextUrl.searchParams.get('code');

    if (!code) {
        return NextResponse.json({ error: 'No code provided' }, { status: 400 });
    }

    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code,
            redirect_uri: process.env.GITHUB_REDIRECT_URI,
        }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
        return NextResponse.json({ error: tokenData.error_description }, { status: 400 });
    }

    const userResponse = await fetch('https://api.github.com/user', {
        headers: {
            Authorization: `Bearer ${tokenData.access_token}`,
        },
    });

    const userData = await userResponse.json();

    return NextResponse.json(userData);
}
