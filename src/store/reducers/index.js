import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';
import authReducer from './authReducer';

const rootPersistConfig = {
  key: 'persistStore',
  storage: AsyncStorage,
  whitelist: ['auth']
};

// If you want whitelist a specific value please follow the following example
// Good explanation: https://blog.reactnativecoach.com/the-definitive-guide-to-redux-persist-84738167975
// eslint-disable-next-line no-unused-vars
const notePersistConfig = {
  key: 'note',
  storage: AsyncStorage,
  blacklist: ['value']
};

const rootReducer = combineReducers({
  auth: authReducer
  // note: persistReducer(notePersistConfig, noteReducer)
});

export default persistReducer(rootPersistConfig, rootReducer);
