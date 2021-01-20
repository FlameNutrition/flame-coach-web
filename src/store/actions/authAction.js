import * as actionType from './actionsType';

const loggedInSuccess = (userInfo) => {
  return {
    type: actionType.AUTH_LOGIN_SUCCESS,
    user: userInfo
  };
};

const loggedInFail = () => {
  return {
    type: actionType.AUTH_LOGIN_FAIL
  };
};

export const loggedIn = (email, password) => {
  return (dispatch) => {
    const isEmailValid = email === 'test@test.com';
    const isPasswordValid = password === 'password';
    const isAuth = isEmailValid && isPasswordValid;

    if (isAuth) {
      const userInfo = JSON.stringify('user');
      dispatch(loggedInSuccess(userInfo));
    } else {
      dispatch(loggedInFail());
    }
  };
};

export const loggedOut = () => {
  return {
    type: actionType.AUTH_LOGOUT
  };
};
