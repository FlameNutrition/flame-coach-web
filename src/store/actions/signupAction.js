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
      url: '/customer/create',
      headers: {
        'Content-Type': 'application/json'
      },
      data
    };

    axios(config)
      .then((response) => {
        dispatch(signupSuccess(response.data));
      })
      .catch((error) => {
        try {
          const errorLevel = error.response.status === 500 ? 'ERROR' : 'WARNING';
          const errorMessage = error.response.data.detail;
          dispatch(signupFailed({
            level: errorLevel,
            message: errorMessage
          }));
        } catch (ex) {
          logger.error('Exception', ex);
          dispatch(signupFailed({
            level: 'ERROR',
            message: process.env.REACT_APP_MSG_SERVER_ERROR
          }));
        }
      });
  };
};
