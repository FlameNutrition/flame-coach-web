import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import logger from 'loglevel';
import { QueryClient, QueryClientProvider } from 'react-query';
import * as serviceWorker from './serviceWorker';
import App from './app/connector';
import * as configStore from './store/configureStore';

logger.setLevel(process.env.REACT_APP_LOG_LEVEL);

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

ReactDOM.render((
  <Provider store={configStore.default().store}>
    <PersistGate persistor={configStore.default().persistStorage}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </QueryClientProvider>
      </MuiPickersUtilsProvider>
    </PersistGate>
  </Provider>
), document.getElementById('root'));

serviceWorker.unregister();
