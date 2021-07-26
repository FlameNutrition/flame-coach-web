import React, { useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { useRouter } from 'next/router';
import Register from '../../components/Auth/Register';
import { signIn, useSession } from 'next-auth/client';
import axios from '../../api/axios/axios-flame-coach';
import ErrorMessage from '../../components/Notification/ErrorMessage/ErrorMessage';

const RegisterPage = () => {

  const [session, loading] = useSession();
  const router = useRouter();

  const [error, setError] = React.useState(null);

  const signInHandler = async (userInfo) => {

    const data = JSON.stringify({
      firstname: userInfo.firstName,
      lastname: userInfo.lastName,
      email: userInfo.email,
      password: userInfo.password,
      type: userInfo.userType,
      policy: true,
      registrationKey: userInfo.userType === 'CLIENT' ? userInfo.registrationKey : null
    });

    const config = {
      method: 'post',
      url: '/customer/create',
      headers: {
        'Content-Type': 'application/json'
      },
      data
    };

    try {
      await axios(config);

      const response = await signIn('email-password-credential', {
        username: userInfo.email,
        password: userInfo.password,
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
    } catch (errorException) {
      let errorCode;

      if (errorException.response) {
        errorCode = ErrorMessage.fromCode(errorException.response.data.code);
      } else {
        errorCode = ErrorMessage.CODE_9999;
      }

      setError({
        level: errorCode.level,
        message: errorCode.msg
      });
    }
  };

  useEffect(() => {
    if (loading) return;
    if (session) router.replace('/');
  });

  return (
    <MainLayout>
      <Register
        routerQuery={router.asPath}
        signUp={signInHandler}
        error={error}
      />
    </MainLayout>
  );
};

export default RegisterPage;
