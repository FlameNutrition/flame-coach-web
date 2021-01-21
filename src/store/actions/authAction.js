import moment from 'moment';
import * as actionType from './actionsType';

const loggedInSuccess = (userInfo) => {
  return {
    type: actionType.AUTH_LOGIN_SUCCESS,
    payload: {
      userDetails: userInfo
    }
  };
};

const loggedInFail = (errorMessage) => {
  return {
    type: actionType.AUTH_LOGIN_FAIL,
    payload: {
      error: errorMessage
    }
  };
};

export const loggedIn = (email, password) => {
  return (dispatch) => {
    const isEmailValid = email === 'test@test.com';
    const isPasswordValid = password === 'password';
    const isAuth = isEmailValid && isPasswordValid;

    if (isAuth) {
      const responseApi = {
        username: 'nbento.neves@gmail.com',
        firstname: 'Nuno',
        lastname: 'Bento',
        token: '048b4069-d954-4e66-b6ce-6cda605140bc',
        expiration: moment().utc().add(1, 'hour')
      };
      dispatch(loggedInSuccess(responseApi));
    } else {
      dispatch(loggedInFail('Email Address or password invalid, please try again...'));
    }
  };
};

export const loggedOut = () => {
  return {
    type: actionType.AUTH_LOGOUT
  };
};
