'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';

type GitHubUser = {
    name: string | null;
    login: string;
    email: string | null;
    avatar_url: string;
};

const Container = styled.main`
  font-family: 'Segoe UI', sans-serif;
  max-width: 600px;
  margin: 4rem auto;
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: 100px;
  margin-bottom: 1rem;
`;

const Field = styled.p`
  margin: 0.5rem 0;
`;

const Label = styled.span`
  font-weight: bold;
  color: #555;
`;

const Button = styled.button`
  padding: 0.6rem 1.2rem;
  background-color: #2ea44f;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #22863a;
  }
`;

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
        <Container>
            <h1>Simple GitHub OAuth App</h1>
    {user ? (
        <>
            <Avatar src={user.avatar_url} alt="Avatar" />
        <Field><Label>Name:</Label> {user.name || 'N/A'}</Field>
    <Field><Label>Username:</Label> {user.login}</Field>
    <Field><Label>Email:</Label> {user.email || 'N/A'}</Field>
    </>
    ) : (
        <Button onClick={handleLogin}>Sign in with GitHub</Button>
        )}
    </Container>
);
}
