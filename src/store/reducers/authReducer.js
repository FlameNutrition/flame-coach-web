import update from 'immutability-helper';
import * as actionType from '../actions/actionsType';

const initialState = {
  loggedIn: false,
  userInfo: null,
  errorSignup: null,
  errorLogin: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.AUTH_LOGIN_SUCCESS:
      return update(state, {
        loggedIn: { $set: true },
        userInfo: { $set: action.payload.userDetails },
        errorLogin: { $set: null }
      });
    case actionType.AUTH_LOGIN_FAIL:
      return update(state, {
        errorLogin: { $set: action.payload.error }
      });
    case actionType.AUTH_LOGIN_RESET:
      return update(state, {
        errorLogin: { $set: null }
      });
    case actionType.AUTH_LOGOUT:
      return update(state, {
        loggedIn: { $set: false },
        userInfo: { $set: null },
        errorLogin: { $set: null }
      });
    case actionType.AUTH_SIGNUP_SUCCESS:
      return update(state, {
        loggedIn: { $set: true },
        userInfo: { $set: action.payload.userDetails },
        errorSignup: { $set: null }
      });
    case actionType.AUTH_SIGNUP_FAIL:
      return update(state, {
        errorSignup: { $set: action.payload.error }
      });
    case actionType.AUTH_SIGNUP_RESET:
      return update(state, {
        errorSignup: { $set: null }
      });
    default:
      return state;
  }
};

export default authReducer;
