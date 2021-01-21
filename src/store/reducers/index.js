import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';
import authReducer from './authReducer';
import notificationReducer from './notificationReducer';

const rootPersistConfig = {
  key: 'persistStore',
  storage: AsyncStorage,
  blacklist: ['auth']
};

// If you want whitelist a specific value please follow the following example
// Good explanation: https://blog.reactnativecoach.com/the-definitive-guide-to-redux-persist-84738167975
// eslint-disable-next-line no-unused-vars
const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  blacklist: ['error']
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  notification: notificationReducer
});

export default persistReducer(rootPersistConfig, rootReducer);
