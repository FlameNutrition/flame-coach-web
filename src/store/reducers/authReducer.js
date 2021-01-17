import update from 'immutability-helper';
import * as actionType from '../actions/actionsType';

const initialState = {
  loggedIn: false,
  username: null
};

const authReducer = (state = initialState, action) => {
  switch (action) {
    case actionType.AUTH_LOGIN:
      return update(state, {
        loggedIn: action.auth
      });

    case actionType.AUTH_LOGOUT:
      return update(state, {
        loggedIn: false
      });
    default:
      return state;
  }
};

export default authReducer;
