import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountClient from 'src/views/account/AccountClient';
import AccountCoach from 'src/views/account/AccountCoach';
import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardClient from 'src/views/reports/DashboardClient';
import DashboardCoach from 'src/views/reports/DashboardCoach';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';
import Planner from './views/planner';
import LogoutView from './views/auth/LogoutView';

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
        { path: 'register', element: <RegisterView /> },
        { path: '*', element: <Navigate to="/app/404" /> }
      ]
    }
  ];
};

export default routes;
