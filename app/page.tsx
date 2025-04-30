'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if redirected back with code
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      // Exchange code for access token
      fetch('/api/auth/callback?code=' + code)
          .then((res) => res.json())
          .then((data) => {
            setUser(data);
            // Remove code from URL
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
