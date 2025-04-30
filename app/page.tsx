'use client';

import { useEffect, useState } from 'react';

type GitHubUser = {
    name: string;
    login: string;
    email: string;
    avatar_url: string;
};

export default function Home() {
    const [user, setUser] = useState<GitHubUser | null>(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

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
        <main>
            <h1>Simple GitHub OAuth App</h1>
            {user ? (
                <div>
                    <p>Welcome, {user.name}!</p>
                    <img src={user.avatar_url} alt="Avatar" width={50} />
                    <p>Username: {user.login}</p>
                    <p>Email: {user.email}</p>
                </div>
            ) : (
                <button onClick={handleLogin}>Sign in with GitHub</button>
            )}
        </main>
    );
}
