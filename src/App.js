import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';

const App = (props) => {
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const routing = useRoutes(routes(props.isAuth, props.userType));

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.loggedIn,
    userType: state.auth.userInfo !== null ? state.auth.userInfo.userType : null
  };
};

export default connect(mapStateToProps, null)(withCookies(App));
