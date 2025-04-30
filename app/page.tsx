'use client';

import { useEffect, useState } from 'react';

type GitHubUser = {
    name: string | null;
    login: string;
    avatar_url: string;
    html_url: string;
    public_repos: number;
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
                    window.history.replaceState({}, document.title, '/');
                });
        }
    }, []);

    const handleLogin = () => {
        window.location.href = '/api/auth/login';
    };

    return (
        <main style={{
            fontFamily: 'Segoe UI, sans-serif',
            textAlign: 'center',
            marginTop: '4rem',
            maxWidth: '600px',
            marginInline: 'auto',
            padding: '2rem',
            borderRadius: '12px',
            background: '#f9f9f9',
            boxShadow: '0 0 12px rgba(0, 0, 0, 0.1)',
        }}>
            <h1>Simple GitHub OAuth App</h1>

            {user ? (
                <div>
                    <p>Welcome, <strong>{user.name || user.login}</strong>!</p>
                    <img
                        src={user.avatar_url}
                        alt="Avatar"
                        width={100}
                        height={100}
                        style={{ borderRadius: '50%', marginBottom: '1rem' }}
                    />
                    <p><strong>Username:</strong> {user.login}</p>
                    <p>
                        <strong>GitHub:</strong>{' '}
                        <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                            {user.html_url}
                        </a>
                    </p>
                    <p><strong>Public Repos:</strong> {user.public_repos}</p>
                </div>
            ) : (
                <button
                    onClick={handleLogin}
                    style={{
                        padding: '0.6rem 1.2rem',
                        backgroundColor: '#2ea44f',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        cursor: 'pointer',
                    }}
                >
                    Sign in with GitHub
                </button>
            )}
        </main>
    );
}
