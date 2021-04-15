import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import authReducer from './authReducer';
import notificationReducer from './notificationReducer';

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

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  notification: notificationReducer
});

export default persistReducer(rootPersistConfig, rootReducer);
