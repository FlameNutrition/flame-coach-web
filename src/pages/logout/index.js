import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { loggedOut } from '../../store/actions';

const authSelector = (state) => state.auth.loggedIn;

const LogoutPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuth = useSelector(authSelector);

  useEffect(() => {
    if (isAuth) {
      dispatch(loggedOut());
    }

    router.replace('/login');
  });

  return (
    <></>
  );
};

export default LogoutPage;
