import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import logger from 'loglevel';

const MainLayout = lazy(() => import('./layouts/MainLayout'));
const DashboardLayout = lazy(() => import('./layouts/DashboardLayout'));

const AccountClient = lazy(() => import('./views/account/AccountClient'));
const AccountCoach = lazy(() => import('./views/account/AccountCoach'));
const CustomerListView = lazy(() => import('./views/customer'));
const DashboardClient = lazy(() => import('./views/dashboard/DashboardClient'));
const DashboardCoach = lazy(() => import('./views/dashboard/DashboardCoach'));
const LoginView = lazy(() => import('./views/auth/LoginView'));
const NotFoundView = lazy(() => import('./views/notFound/NotFoundView'));
const RegisterView = lazy(() => import('./views/auth/RegisterView'));
const SettingsView = lazy(() => import('./views/settings/SettingsView'));
const Planner = lazy(() => import('./views/planner'));
const LogoutView = lazy(() => import('./views/auth/LogoutView'));

const routes = (isAuth, userType) => {
  const childrenCoach = [
    { path: 'account', element: <AccountCoach /> },
    { path: 'customers', element: <CustomerListView /> },
    { path: 'planner', element: <Planner /> },
    { path: 'dashboard', element: <DashboardCoach /> },
    { path: 'settings', element: <SettingsView /> },
    { path: 'logout', element: <LogoutView /> },
    { path: '404', element: <NotFoundView /> },
    { path: '*', element: <Navigate to="/app/404" /> }
  ];

  const childrenClient = [
    { path: 'account', element: <AccountClient /> },
    { path: 'dashboard', element: <DashboardClient /> },
    { path: 'settings', element: <SettingsView /> },
    { path: 'logout', element: <LogoutView /> },
    { path: '404', element: <NotFoundView /> },
    { path: '*', element: <Navigate to="/app/404" /> }
  ];

  logger.debug('userType:', userType);

  return [
    {
      path: 'app',
      element: isAuth ? <DashboardLayout /> : <Navigate to="/login" />,
      children: userType === 'COACH' ? childrenCoach : childrenClient
    },
    {
      path: '/',
      element: !isAuth ? <MainLayout /> : <Navigate to="/app/dashboard" />,
      children: [
        { path: 'login', element: <LoginView /> },
        { path: '/', element: <Navigate to="/login" /> },
        { path: 'register', element: <RegisterView termsConditions={false} /> },
        { path: '*', element: <Navigate to="/app/404" /> }
      ]
    }
  ];
};

export default routes;
