import React, { useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import Login from '../../components/Auth/Login';
import { useDispatch, useSelector } from 'react-redux';
import { loggedIn, loggedInReset } from '../../store/actions';
import { useRouter } from 'next/router';

const authSelector = (state) => state.auth.loggedIn;
const errorSelector = (state) => state.auth.errorLogin;

const LoginPage = () => {
  const isAuth = useSelector(authSelector);
  const error = useSelector(errorSelector);
  const dispatch = useDispatch();
  const router = useRouter();

  const signIn = (email, password) => dispatch(loggedIn(email, password));
  const signInReset = () => dispatch(loggedInReset());

  useEffect(() => {
    if (isAuth) {
      router.replace('/');
    }
  });

  useEffect(() => {
    if (error) {
      signInReset();
    }
  }, []);

  return (
    <MainLayout>
      <Login
        error={error}
        signIn={signIn}
      />
    </MainLayout>
  );
};

export default LoginPage;
