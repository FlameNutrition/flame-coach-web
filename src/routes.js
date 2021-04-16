import React, { lazy } from 'react';

import DashboardLayout from './layouts/DashboardLayout';
import Loading from './components/Loading';
import MainLayout from './layouts/MainLayout';
import { Navigate } from 'react-router-dom';

const AccountClient = lazy(() => import('./views/account/AccountClient/connector'));
const AccountCoach = lazy(() => import('./views/account/AccountCoach/connector'));
const CustomerListView = lazy(() => import('./views/customer/connector'));
const DashboardClient = lazy(() => import('./views/dashboard/DashboardClient/connector'));
const DashboardCoach = lazy(() => import('./views/dashboard/DashboardCoach'));
const LoginView = lazy(() => import('./views/auth/LoginView'));
const NotFoundView = lazy(() => import('./views/notFound/NotFoundView'));
const RegisterView = lazy(() => import('./views/auth/RegisterView'));
const SettingsView = lazy(() => import('./views/settings/SettingsView'));
const LogoutView = lazy(() => import('./views/auth/LogoutView/connector'));
const Planner = lazy(() => import('./views/planner/connector'));

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

  return [
    {
      path: 'loading',
      element: <Loading size={200} />
    },
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
