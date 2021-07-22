import { useSelector } from 'react-redux';
import { isFeatureEnable } from '../utils/toggles';
import PropTypes from 'prop-types';

const customerTypeSelector = (state) => state.auth.userInfo.type;
const customerIdentifierSelector = (state) => state.auth.userInfo.identifier;

const routesCoach = [
  {
    path: '/',
    enableWhitelist: false
  },
  {
    path: '/account',
    enableWhitelist: false
  },
  {
    path: '/clients',
    enableWhitelist: false
  },
  {
    path: '/planner',
    enableWhitelist: false
  },
  {
    path: '/settings',
    enableWhitelist: false
  },
];

const routesClient = [
  {
    path: '/',
    enableWhitelist: false
  },
  {
    path: '/account',
    enableWhitelist: false
  },
  {
    path: '/measures',
    enableWhitelist: true
  },
  {
    path: '/settings',
    enableWhitelist: false
  },
];

const Whitelist = ({
  router,
  children
}) => {
  const customerType = useSelector(customerTypeSelector);
  const identifier = useSelector(customerIdentifierSelector);

  let route;

  if (customerType === 'CLIENT') {
    route = routesClient.find((routeStruct) => routeStruct.path === router.pathname);
  }

  if (customerType === 'COACH') {
    route = routesCoach.find((routeStruct) => routeStruct.path === router.pathname);
  }

  if (route === undefined || !isFeatureEnable(route.path, identifier)) {
    router.replace('/404');
  }

  return children;
};

Whitelist.propTypes = {
  router: PropTypes.object,
  children: PropTypes.node,
};

export default Whitelist;
