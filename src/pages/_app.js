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
        <Provider session={pageProps.session}>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </Provider>
      </ThemeProvider>
    </>
  );
};

export default wrapper.withRedux(App);
