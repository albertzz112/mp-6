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
            minHeight: '100vh',
            backgroundColor: '#0d1117',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem'
        }}>
            <main style={{
                backgroundColor: '#ffffff10',
                color: '#ffffff',
                padding: '2.5rem',
                borderRadius: '1rem',
                maxWidth: '480px',
                width: '100%',
                textAlign: 'center',
                boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(8px)'
            }}>
                <h1 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', fontWeight: 'bold' }}>
                    Simple GitHub OAuth App
                </h1>

                {user ? (
                    <div>
                        <img
                            src={user.avatar_url}
                            alt="Avatar"
                            width={100}
                            height={100}
                            style={{ borderRadius: '50%', marginBottom: '1rem' }}
                        />
                        <p style={{ marginBottom: '0.5rem' }}>
                            <strong>Name:</strong> {user.name || user.login}
                        </p>
                        <p style={{ marginBottom: '0.5rem' }}>
                            <strong>Username:</strong> {user.login}
                        </p>
                        <p style={{ marginBottom: '0.5rem' }}>
                            <strong>Public Repos:</strong> {user.public_repos}
                        </p>
                        <p style={{ marginBottom: '1rem' }}>
                            <strong>GitHub:</strong>{' '}
                            <a href={user.html_url} target="_blank" rel="noopener noreferrer" style={{ color: '#58a6ff' }}>
                                {user.html_url}
                            </a>
                        </p>
                    </div>
                ) : (
                    <button
                        onClick={handleLogin}
                        style={{
                            backgroundColor: '#2ea44f',
                            color: '#fff',
                            padding: '0.7rem 1.5rem',
                            fontSize: '1rem',
                            border: 'none',
                            borderRadius: '0.5rem',
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
