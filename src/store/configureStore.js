import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { persistStore } from 'redux-persist';
// import logger from 'redux-logger';

import moment from 'moment';
import rootReducer from './reducers';

const configureStore = (preloadedState) => {
  const middlewares = [thunkMiddleware];
  const middlewareEnchancer = applyMiddleware(...middlewares);

  const enchancers = [middlewareEnchancer];
  const composedEnchancers = composeWithDevTools(...enchancers);

  return createStore(rootReducer, preloadedState, composedEnchancers);
};

const store = configureStore();

const handleVerifyAuthExpiration = () => {
  const storeState = store.getState();

  if (storeState.auth && storeState.auth.userInfo) {
    const date = moment().utc();
    const expirationDate = moment(storeState.auth.userInfo.expiration);

    if (date.isAfter(expirationDate)) {
      storeState.auth.userInfo = null;
      storeState.auth.loggedIn = false;
      window.location.reload(false);
    }
  }
};

store.subscribe(handleVerifyAuthExpiration);

export default () => {
  const persistStorage = persistStore(store);
  return { store, persistStorage };
};
