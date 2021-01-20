import * as actionType from '../actions/actionsType';

const initialState = { loggedIn: false, userInfo: null };

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.AUTH_LOGIN_SUCCESS:
      return {
        loggedIn: true,
        userInfo: action.user
      };
    case actionType.AUTH_LOGIN_FAIL:
      return {
        loggedIn: false,
        userInfo: null
      };
    case actionType.AUTH_LOGOUT:
      return {
        loggedIn: false,
        userInfo: null
      };
    default:
      return state;
  }
};

export default authReducer;
