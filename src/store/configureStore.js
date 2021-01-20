import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';

import rootReducer from './reducers';

const configureStore = (preloadedState) => {
  const middlewares = [thunkMiddleware, logger];
  const middlewareEnchancer = applyMiddleware(...middlewares);

  const enchancers = [middlewareEnchancer];
  const composedEnchancers = composeWithDevTools(...enchancers);

  return createStore(rootReducer, preloadedState, composedEnchancers);
};

export default () => {
  const store = configureStore();
  const persistStorage = persistStore(store);
  return { store, persistStorage };
};
