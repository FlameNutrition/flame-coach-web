import logger from 'loglevel';

import axios from '../../api/axios/axios-flame-coach';
import ErrorMessage from '../../components/Core/Notification/ErrorMessage/ErrorMessage';
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
      policy: true,
      registrationKey: userInfo.userType === 'CLIENT' ? userInfo.registrationKey : null
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
          const errorCode = ErrorMessage.fromCode(error.response.data.code);
          dispatch(signupFailed({
            level: errorCode.level,
            message: errorCode.msg
          }));
        } catch (ex) {
          logger.error('Exception', ex);
          dispatch(signupFailed({
            level: 'ERROR',
            message: ErrorMessage.CODE_9999.msg
          }));
        }
      });
  };
};
