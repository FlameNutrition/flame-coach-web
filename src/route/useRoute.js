import React from 'react';
import { useSelector } from 'react-redux';
import { isFeatureEnable } from '../utils/toggles';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const DashboardClientView = dynamic(() => import('../views/dashboard/DashboardClient/connector'));
const DashboardCoachView = dynamic(() => import('../views/dashboard/DashboardCoach'));
const AccountCoachView = dynamic(() => import('../views/account/AccountCoach/connector'));
const AccountClientView = dynamic(() => import('../views/account/AccountClient/connector'));
const ClientsView = dynamic(() => import('../views/customer/connector'));
const PlannerView = dynamic(() => import('../views/planner/connector'));
const SettingsView = dynamic(() => import('../views/settings/connector'));
const NotFoundView = dynamic(() => import('../views/notFound/NotFoundView'));
const MeasuresView = dynamic(() => import('../views/measures/connector'));

const customerTypeSelector = (state) => state.auth.userInfo.type;
const customerIdentifierSelector = (state) => state.auth.userInfo.identifier;

const routesCoach = [
  {
    path: '/',
    element: <DashboardCoachView/>,
    enableWhitelist: false
  },
  {
    path: '/account',
    element: <AccountCoachView/>,
    enableWhitelist: false
  },
  {
    path: '/clients',
    element: <ClientsView/>,
    enableWhitelist: false
  },
  {
    path: '/planner',
    element: <PlannerView/>,
    enableWhitelist: false
  },
  {
    path: '/settings',
    element: <SettingsView/>,
    enableWhitelist: false
  },
];

const routesClient = [
  {
    path: '/',
    element: <DashboardClientView/>,
    enableWhitelist: false
  },
  {
    path: '/account',
    element: <AccountClientView/>,
    enableWhitelist: false
  },
  {
    path: '/measures',
    element: <MeasuresView/>,
    enableWhitelist: true
  },
  {
    path: '/settings',
    element: <SettingsView/>,
    enableWhitelist: false
  },
];

const useRoutes = () => {
  const customerType = useSelector(customerTypeSelector);
  const identifier = useSelector(customerIdentifierSelector);
  const router = useRouter();

  const notFoundRoute = {
    path: '/404',
    element: <NotFoundView/>,
    enableWhitelist: false
  };

  let route;

  if (customerType === 'CLIENT') {
    route = routesClient.find((routeStruct) => routeStruct.path === router.pathname);
  }

  if (customerType === 'COACH') {
    route = routesCoach.find((routeStruct) => routeStruct.path === router.pathname);
  }

  if (route === undefined || !isFeatureEnable(route.path, identifier)) {
    return notFoundRoute;
  }

  return route;
};

export default useRoutes;
