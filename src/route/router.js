import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const unprotectedRoutes = [
  '/login', '/logout', '/register'
];

const authSelector = (state) => state.auth.loggedIn;

const Router = ({ router, children }) => {
  const pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1;
  const isAuth = useSelector(authSelector);

  if (!isAuth && pathIsProtected) {
    router.replace('/login');
    return null;
  }

  return children;
};

Router.propTypes = {
  router: PropTypes.object,
  children: PropTypes.node,
};

export default Router;
