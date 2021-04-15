import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import theme from 'src/theme';
import routes from 'src/routes';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
import PropTypes from 'prop-types';

const App = ({ isAuth, userType }) => {
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const routing = useRoutes(routes(isAuth, userType));

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Suspense fallback={<div>Loading...</div>}>
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

export default connect(mapStateToProps, null)(withCookies(App));
