import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import { PersistGate } from 'redux-persist/integration/react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import logger from 'loglevel';
import { QueryClient, QueryClientProvider } from 'react-query';
import * as serviceWorker from './serviceWorker';
import App from './App';
import * as configStore from './store/configureStore';

logger.setLevel('trace');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 300000,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true
    }
  }
});

ReactDOM.render((

  <CookiesProvider>
    <BrowserRouter>
      <Provider store={configStore.default().store}>
        <PersistGate persistor={configStore.default().persistStorage}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </MuiPickersUtilsProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </CookiesProvider>

), document.getElementById('root'));

serviceWorker.unregister();
