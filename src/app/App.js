import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import PropTypes from 'prop-types';
import GlobalStyles from '../components/GlobalStyles';
import theme from '../theme';
import routes from '../routes';
import Loading from '../components/Loading';

const App = ({ isAuth, userType }) => {
  const routing = useRoutes(routes(isAuth, userType));

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Suspense fallback={<Loading message="loading" />}>
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
