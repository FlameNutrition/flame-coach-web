import update from 'immutability-helper';
import * as actionType from '../actions/actionsType';

const initialState = {
  loggedIn: false,
  userInfo: null,
  error: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.AUTH_LOGIN_SUCCESS:
      return update(state, {
        loggedIn: { $set: true },
        userInfo: { $set: action.payload.userDetails },
        error: { $set: null }
      });
    case actionType.AUTH_LOGIN_FAIL:
      return update(state, {
        error: { $set: action.payload.error }
      });
    case actionType.AUTH_LOGOUT:
      return update(state, {
        loggedIn: { $set: false },
        userInfo: { $set: null },
        error: { $set: null }
      });
    case actionType.AUTH_SIGNUP_SUCCESS:
      return update(state, {
        loggedIn: { $set: true },
        userInfo: { $set: action.payload.userDetails },
        error: { $set: null }
      });
    case actionType.AUTH_SIGNUP_FAIL:
      return update(state, {
        error: { $set: action.payload.error }
      });
    default:
      return state;
  }
};

export default authReducer;
