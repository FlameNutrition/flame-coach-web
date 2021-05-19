import 'react-perfect-scrollbar/dist/css/styles.css';

import React, { Suspense } from 'react';

import GlobalStyles from '../components/GlobalStyles';
import Loading from '../components/Loading';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/core';
import routes from '../routes';
import theme from '../theme';
import { useRoutes } from 'react-router-dom';

const App = ({ isAuth, userType }) => {
  const isInProgress = process.env.REACT_APP_TOGGLE_IN_PROGRESS;
  const routing = useRoutes(routes(isAuth, userType, isInProgress));

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
  return {
    isAuth: state.auth.loggedIn,
    userType: state.auth.userInfo !== null ? state.auth.userInfo.type : null
  };
};

App.propTypes = {
  isAuth: PropTypes.bool,
  userType: PropTypes.string,
};

export { App, mapStateToProps };
