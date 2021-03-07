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
      url: '/client/newSession',
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
        logger.debug('Error:', error.response);
        const errorLevel = error.response.status === 500 ? 'ERROR' : 'WARNING';
        const errorMessage = error.response.data.detail;
        dispatch(loggedInFail({
          level: errorLevel,
          message: errorMessage
        }));
      });
  };
};

export const loggedOut = () => {
  return {
    type: actionType.AUTH_LOGOUT
  };
};
