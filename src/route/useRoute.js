import React from 'react';
import { useSelector } from 'react-redux';
import { isFeatureEnable } from '../utils/toggles';

import DashboardClientView from '../views/dashboard/DashboardClient/connector';
import DashboardCoachView from '../views/dashboard/DashboardCoach';
import AccountCoachView from '../views/account/AccountCoach/connector';
import AccountClientView from '../views/account/AccountClient/connector';
import ClientsView from '../views/customer/connector';
import PlannerView from '../views/planner/connector';
import SettingsView from '../views/settings/connector';
import NotFoundView from '../views/notFound/NotFoundView';
import MeasuresView from '../views/measures/connector';

import { useRouter } from 'next/router';

const customerTypeSelector = (state) => state.auth.userInfo.type;
const customerIdentifierSelector = (state) => state.auth.userInfo.identifier;

const routesCoach = [
  { path: '/', element: <DashboardCoachView />, enableWhitelist: false },
  { path: '/account', element: <AccountCoachView />, enableWhitelist: false },
  { path: '/clients', element: <ClientsView />, enableWhitelist: false },
  { path: '/planner', element: <PlannerView />, enableWhitelist: false },
  { path: '/settings', element: <SettingsView />, enableWhitelist: false },
];

const routesClient = [
  { path: '/', element: <DashboardClientView />, enableWhitelist: false },
  { path: '/account', element: <AccountClientView />, enableWhitelist: false },
  { path: '/measures', element: <MeasuresView />, enableWhitelist: true },
  { path: '/settings', element: <SettingsView />, enableWhitelist: false },
];

const useRoutes = () => {
  const customerType = useSelector(customerTypeSelector);
  const identifier = useSelector(customerIdentifierSelector);
  const router = useRouter();

  const notFoundRoute = { path: '/404', element: <NotFoundView />, enableWhitelist: false };

  let route;

  if (customerType === 'CLIENT') {
    route = routesClient.find((routeStruct) => routeStruct.path === router.pathname);
  }

  if (customerType === 'COACH') {
    route = routesCoach.find((routeStruct) => routeStruct.path === router.pathname);
  }

  if(route === undefined || !isFeatureEnable(route.path, identifier)){
    return notFoundRoute;
  }

  return route;
};

export default useRoutes;
