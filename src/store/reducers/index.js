import { combineReducers } from 'redux';
import notificationReducer from './notificationReducer';

export default combineReducers({
  notification: notificationReducer
});
