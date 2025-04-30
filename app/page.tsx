'use client';

import { useEffect, useState } from 'react';

type GitHubUser = {
    name: string | null;
    login: string;
    email: string | null;
    avatar_url: string;
};

export default function Home() {
    const [user, setUser] = useState<GitHubUser | null>(null);

    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get('code');
        if (code) {
            fetch('/api/auth/callback?code=' + code)
                .then((res) => res.json())
                .then((data: GitHubUser) => {
                    setUser(data);
                    window.history.replaceState({}, document.title, '/'); // clean URL
                });
        }
    }, []);

    const handleLogin = () => {
        window.location.href = '/api/auth/login';
    };

    return (
        <main style={{ fontFamily: 'sans-serif', textAlign: 'center', marginTop: '4rem' }}>
            <h1>Simple GitHub OAuth App</h1>
            {user ? (
                <div>
                    <p>Welcome, {user.name || user.login}!</p>
                    <img src={user.avatar_url} alt="Avatar" width={80} style={{ borderRadius: '50%' }} />
                    <p><strong>Username:</strong> {user.login}</p>
                    <p><strong>Email:</strong> {user.email ?? 'N/A'}</p>
                </div>
            ) : (
                <button onClick={handleLogin} style={{
                    padding: '0.6rem 1.2rem',
                    background: '#2ea44f',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    cursor: 'pointer'
                }}>Sign in with GitHub</button>
            )}
        </main>
    );
}
