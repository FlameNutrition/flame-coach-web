import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './reducers';

const configureStore = (preloadedState) => {
  const middlewares = [thunkMiddleware];
  const middlewareEnchancer = applyMiddleware(...middlewares);

  const enchancers = [middlewareEnchancer];
  const composedEnchancers = composeWithDevTools(...enchancers);

  return createStore(rootReducer, preloadedState, composedEnchancers);
};

export default configureStore;
