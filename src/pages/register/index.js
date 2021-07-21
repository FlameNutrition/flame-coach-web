import React, { useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { signup, signupReset } from '../../store/actions';
import Register from '../../components/Auth/Register';

const authSelector = (state) => state.auth.loggedIn;
const errorSelector = (state) => state.auth.errorSignup;

const RegisterPage = () => {
  const isAuth = useSelector(authSelector);
  const error = useSelector(errorSelector);
  const router = useRouter();
  const dispatch = useDispatch();

  const signUpReset = () => dispatch(signupReset());
  const signUp = (userInfo) => dispatch(signup(userInfo));

  useEffect(() => {
    if (isAuth) {
      router.replace('/');
    }
  });

  useEffect(() => {
    if (error) {
      signUpReset();
    }
  }, []);

  return (
    <MainLayout>
      <Register
        routerQuery={router.asPath}
        signUp={signUp}
        error={error}
      />
    </MainLayout>
  );
};

export default RegisterPage;
