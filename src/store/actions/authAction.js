import logger from 'loglevel';

import axios from '../../api/axios/axios-flame-coach';
import ErrorMessage from '../../components/Core/Notification/ErrorMessage/ErrorMessage';
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
          const errorCode = ErrorMessage.fromCode(error.response.data.code);
          dispatch(loggedInFail({
            level: errorCode.level,
            message: errorCode.msg
          }));
        } catch (ex) {
          logger.error('Exception', ex);
          dispatch(loggedInFail({
            level: 'ERROR',
            message: ErrorMessage.CODE_9999.msg
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
