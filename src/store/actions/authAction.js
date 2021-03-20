import logger from 'loglevel';
import axios from '../../axios/axios-flame-coach';
import * as actionType from './actionsType';

const loggedInSuccess = (userInfo) => {
  return {
    type: actionType.AUTH_LOGIN_SUCCESS,
    payload: {
      userDetails: userInfo
    }
  };
};

const loggedInFail = (userInfoError) => {
  return {
    type: actionType.AUTH_LOGIN_FAIL,
    payload: {
      error: userInfoError
    }
  };
};

export const loggedInReset = () => {
  return {
    type: actionType.AUTH_LOGIN_RESET
  };
};

export const loggedIn = (email, password) => {
  return (dispatch) => {
    const data = JSON.stringify({
      email,
      password
    });

    const config = {
      method: 'post',
      url: '/customer/newSession',
      headers: {
        'Content-Type': 'application/json'
      },
      data
    };

    axios(config)
      .then((response) => {
        dispatch(loggedInSuccess(response.data));
      })
      .catch((error) => {
        try {
          const errorLevel = error.response.status === 500 ? 'ERROR' : 'WARNING';
          const errorMessage = error.response.data.detail;
          dispatch(loggedInFail({
            level: errorLevel,
            message: errorMessage
          }));
        } catch (ex) {
          logger.error('Exception', ex);
          dispatch(loggedInFail({
            level: 'ERROR',
            message: process.env.REACT_APP_MSG_SERVER_ERROR
          }));
        }
      });
  };
};

export const loggedOut = () => {
  return {
    type: actionType.AUTH_LOGOUT
  };
};
