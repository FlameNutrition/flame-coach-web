import '../components/Calendar/Calendar.css';
import '../components/Charts/Events/Event.css';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { QueryClient, QueryClientProvider } from 'react-query';
import wrapper from '../store/configureStore';
import CssBaseline from '@material-ui/core/CssBaseline';
import GlobalStyles from '../components/GlobalStyles';
import React from 'react';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import logger from 'loglevel';
import theme from '../theme';
import { Provider } from 'next-auth/client';

logger.setLevel(process.env.NEXT_PUBLIC_LOG_LEVEL);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 300000,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: 'always',
      retry: false
    }
  }
});

// eslint-disable-next-line react/prop-types
const App = ({
  Component,
  pageProps
}) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles/>
        <CssBaseline/>
        <Provider
          // Provider options are not required but can be useful in situations where
          // you have a short session maxAge time. Shown here with default values.
          options={{
            // Client Max Age controls how often the useSession in the client should
            // contact the server to sync the session state. Value in seconds.
            // e.g.
            // * 0  - Disabled (always use cache value)
            // * 60 - Sync session state with server if it's older than 60 seconds
            clientMaxAge: 0,
            // Keep Alive tells windows / tabs that are signed in to keep sending
            // a keep alive request (which extends the current session expiry) to
            // prevent sessions in open windows from expiring. Value in seconds.
            //
            // Note: If a session has expired when keep alive is triggered, all open
            // windows / tabs will be updated to reflect the user is signed out.
            keepAlive: 0
          }}
          session={pageProps.session}>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </Provider>
      </ThemeProvider>
    </>
  );
};

export default wrapper.withRedux(App);
