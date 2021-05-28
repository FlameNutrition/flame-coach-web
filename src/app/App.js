import 'react-perfect-scrollbar/dist/css/styles.css';

import React, { Suspense } from 'react';

import GlobalStyles from '../components/GlobalStyles';
import Loading from '../components/Loading';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/core';
import routes from '../routes';
import theme from '../theme';
import { useRoutes } from 'react-router-dom';

const App = ({
  isAuth,
  userType,
  isWhiteList
}) => {
  const routing = useRoutes(routes(isAuth, userType, isWhiteList));

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Suspense fallback={<Loading size={100} />}>
        {routing}
      </Suspense>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => {
  let isWhitelist = false;

  if (state.auth.userInfo !== null) {
    const uuidWhitelist = process.env.REACT_APP_UUID_WHITELIST.split(',');
    isWhitelist = uuidWhitelist.includes(state.auth.userInfo.identifier);
  }

  return {
    isAuth: state.auth.loggedIn,
    userType: state.auth.userInfo !== null ? state.auth.userInfo.type : null,
    isWhiteList: isWhitelist
  };
};

App.propTypes = {
  isAuth: PropTypes.bool,
  userType: PropTypes.string,
  isWhiteList: PropTypes.bool
};

export { App, mapStateToProps };
