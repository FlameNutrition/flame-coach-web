import { useEffect, useState } from 'react';
import { logInfo } from '../logging';
import { isFeatureEnable } from '../utils/toggles';
import { useSession } from 'next-auth/client';

const unprotectedRoutes = [
  '/login', '/logout', '/register', '/404', '/test'
];

const routesCoach = [{
  path: '/'
}, {
  path: '/account'
}, {
  path: '/clients'
}, {
  path: '/planner'
}, {
  path: '/appointments'
}, {
  path: '/settings'
}, {
  path: '/income'
}
];

const routesClient = [{
  path: '/'
}, {
  path: '/account'
}, {
  path: '/measures'
}, {
  path: '/settings'
}, {
  path: '/client/my-coach'
}
];

const Auth = ({
  router,
  children
}) => {

  const [session, loading] = useSession();
  const [isAuth, setAuth] = useState(false);

  const pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1;

  useEffect(() => {
    if (pathIsProtected) {
      logInfo('auth', 'useEffect', 'This path is protected');
      if (loading) return;
      if (!session) {
        logInfo('auth', 'useEffect', 'No session found, redirect to /login page');
        router.replace('/login');
      } else {
        logInfo('auth', 'useEffect', 'Session found, check the whitelist');
        let route;
        if (session.user.type === 'CLIENT') {
          route = routesClient.find((routeStruct) => routeStruct.path === router.pathname);
        }
        if (session.user.type === 'COACH') {
          route = routesCoach.find((routeStruct) => routeStruct.path === router.pathname);
        }

        if (route === undefined || !isFeatureEnable(route.path, session.user.identifier)) {
          router.replace('/404');
        } else {
          setAuth(true);
        }
      }
    }
  });

  if (!pathIsProtected) return children;
  if (session && !loading && isAuth) return children;
  return null;

};

export default Auth;
