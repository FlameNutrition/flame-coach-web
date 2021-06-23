import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import logger from 'redux-logger';
import { createWrapper } from 'next-redux-wrapper';
import authReducer from './reducers/authReducer';
import notificationReducer from './reducers/notificationReducer';

const createOwnStore = (reducers) => {
  const middlewares = [thunkMiddleware, logger];
  const middlewareEnchancer = applyMiddleware(...middlewares);

  const enchancers = [middlewareEnchancer];
  const composedEnchancers = composeWithDevTools(...enchancers);

  return createStore(reducers, undefined, composedEnchancers);
};

const makeStore = () => {
  const isServer = typeof window === 'undefined';

  if (isServer) {
    return createOwnStore(rootReducer);
  }

  // we need it only on client side
  // eslint-disable-next-line global-require
  const { persistStore, persistReducer } = require('redux-persist');
  // eslint-disable-next-line global-require
  const storageSession = require('redux-persist/lib/storage').default;

  const rootPersistConfig = {
    key: 'persistStore',
    storage: storageSession,
    blacklist: ['auth'],
    // FIXME: This is a bug: https://github.com/rt2zz/redux-persist/issues/786
    timeout: 1
  };

  // If you want whitelist a specific value please follow the following example
  // Good explanation: https://blog.reactnativecoach.com/the-definitive-guide-to-redux-persist-84738167975
  // eslint-disable-next-line no-unused-vars
  const authPersistConfig = {
    key: 'auth',
    storage: storageSession,
    blacklist: ['error']
  };

  const persistedReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authReducer),
    notification: notificationReducer
  });
  const persistedRootReducer = persistReducer(rootPersistConfig, persistedReducer);
  const store = createOwnStore(persistedRootReducer);

  store.__persistor = persistStore(store); // Nasty hack

  return store;
};

export default createWrapper(makeStore);
