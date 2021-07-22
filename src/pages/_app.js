import React from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { QueryClient, QueryClientProvider } from 'react-query';
import wrapper from '../store/configureStore';
import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import theme from '../theme';
import GlobalStyles from '../components/GlobalStyles';
import { useStore } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Router from '../route/router';
import Head from 'next/head';
import logger from 'loglevel';

import '../components/Calendar/Calendar.css';
import '../components/Charts/Events/Event.css';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

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
  pageProps,
  router
}) => {
  const store = useStore();

  return (
    <>
      <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
              <GlobalStyles/>
              <CssBaseline/>
              <Router router={router}>
                <Head>
                  <title>Flame Coach</title>
                </Head>
                <Component {...pageProps} />
              </Router>
            </ThemeProvider>
          </QueryClientProvider>
        </MuiPickersUtilsProvider>
      </PersistGate>
    </>
  );
};

export default wrapper.withRedux(App);
