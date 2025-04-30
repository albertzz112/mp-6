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
        <div style={{
            backgroundColor: '#0d1117',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '4rem 1rem',
        }}>
            <main style={{
                background: '#161b22',
                color: '#f0f6fc',
                padding: '2rem',
                borderRadius: '12px',
                width: '100%',
                maxWidth: '420px',
                textAlign: 'center',
                border: '1px solid #30363d',
                boxSizing: 'border-box',
            }}>
                <h1 style={{
                    fontSize: 'clamp(1.5rem, 5vw, 2rem)',
                    marginBottom: '1.5rem',
                    fontWeight: 600,
                }}>
                    GitHub OAuth App
                </h1>

                {user ? (
                    <>
                        <img
                            src={user.avatar_url}
                            alt="Avatar"
                            width={96}
                            height={96}
                            style={{ borderRadius: '50%', marginBottom: '1rem' }}
                        />
                        <p><strong>Name:</strong> {user.name || user.login}</p>
                        <p><strong>Username:</strong> {user.login}</p>
                        <p><strong>Public Repos:</strong> {user.public_repos}</p>
                        <p style={{ wordBreak: 'break-all' }}>
                            <strong>GitHub:</strong>{' '}
                            <a href={user.html_url} target="_blank" rel="noopener noreferrer" style={{ color: '#58a6ff' }}>
                                {user.html_url}
                            </a>
                        </p>
                    </>
                ) : (
                    <button
                        onClick={handleLogin}
                        style={{
                            backgroundColor: '#238636',
                            color: '#fff',
                            padding: '0.7rem 1.3rem',
                            fontSize: '1rem',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer'
                        }}
                    >
                        Sign in with GitHub
                    </button>
                )}
            </main>
        </div>
    );
}
