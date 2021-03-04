import logger from 'loglevel';
import axios from '../../axios/axios-flame-coach';
import * as actionType from './actionsType';

const signupSuccess = (userInfo) => {
  return {
    type: actionType.AUTH_SIGNUP_SUCCESS,
    payload: {
      userDetails: userInfo
    }
  };
};

const signupFailed = (userInfoError) => {
  logger.debug('Reset signup state!');
  return {
    type: actionType.AUTH_SIGNUP_FAIL,
    payload: {
      error: userInfoError
    }
  };
};

export const signupReset = () => {
  return {
    type: actionType.AUTH_SIGNUP_RESET
  };
};

export const signup = (userInfo) => {
  return (dispatch) => {
    logger.debug('UserInfo:', userInfo);

    const data = JSON.stringify({
      firstname: userInfo.firstName,
      lastname: userInfo.lastName,
      email: userInfo.email,
      password: userInfo.password,
      type: userInfo.userType,
      policy: true
    });

    const config = {
      method: 'post',
      url: '/client/create',
      headers: {
        'Content-Type': 'application/json'
      },
      data
    };

    axios(config)
      .then((response) => {
        dispatch(signupSuccess(response));
      })
      .catch((error) => {
        logger.debug('Error:', error.response);
        const errorLevel = error.response.status === 500 ? 'ERROR' : 'WARNING';
        const errorMessage = error.response.data.detail;
        dispatch(signupFailed({
          level: errorLevel,
          message: errorMessage
        }));
      });
  };
};
