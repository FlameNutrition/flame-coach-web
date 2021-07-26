import React, { useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import Login from '../../components/Auth/Login';
import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

const LoginPage = () => {

  const [session, loading] = useSession();
  const router = useRouter();

  const [error, setError] = React.useState(null);

  useEffect(() => {
    if (loading) return;
    if (session) router.replace('/');
  });

  const signInHandler = async (email, password) => {
    const response = await signIn('email-password-credential', {
      username: email,
      password,
      redirect: false,
      callbackUrl: `${window.location.origin}/`
    });

    if (response.url) {
      router.replace(response.url);
    } else {
      const params = new URLSearchParams(response.error);
      setError({
        level: params.get('level'),
        message: params.get('error')
      });
    }
  };

  return (
    !session && !loading
      ? (
        <MainLayout>
          <Login
            signIn={signInHandler}
            error={error}
          />
        </MainLayout>
      )
      : null
  );
};

export default LoginPage;
