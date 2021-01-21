import log from 'loglevel';
import moment from 'moment';
import * as actionType from './actionsType';

const signupSuccess = (userInfo) => {
  return {
    type: actionType.AUTH_SIGNUP_SUCCESS,
    payload: {
      userDetails: userInfo
    }
  };
};

// eslint-disable-next-line import/prefer-default-export
export const signup = (userInfo) => {
  return (dispatch) => {
    // FIXME: Try to understand this logging doesn't work
    log.info('UserInfo:', userInfo);

    const responseApi = {
      username: userInfo.email,
      firstname: userInfo.firstName,
      lastname: userInfo.lastName,
      token: '048b4069-d954-4e66-b6ce-6cda605140bc',
      expiration: moment().utc().add(1, 'hour')
    };

    dispatch(signupSuccess(responseApi));
  };
};
