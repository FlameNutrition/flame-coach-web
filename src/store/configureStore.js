import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import logger from 'redux-logger';
import { createWrapper } from 'next-redux-wrapper';
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

  const rootReducers = combineReducers({
    notification: notificationReducer
  });
  return createOwnStore(rootReducers);

};

export default createWrapper(makeStore);
