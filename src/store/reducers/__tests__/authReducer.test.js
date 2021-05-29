import {
  AUTH_LOGIN_FAIL, AUTH_LOGIN_RESET, AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  AUTH_SIGNUP_FAIL, AUTH_SIGNUP_RESET, AUTH_SIGNUP_SUCCESS
} from '../../actions/actionsType';
import authReducer from '../authReducer';

describe('authReducer', () => {
  it('check initial state', () => {
    const state = authReducer(undefined, {});

    expect(state).toStrictEqual({
      loggedIn: false,
      userInfo: null,
      errorSignup: null,
      errorLogin: null,
    });
  });

  it('check state login success', () => {
    const state = authReducer(undefined, {
      type: AUTH_LOGIN_SUCCESS,
      payload: {
        userDetails: {
          username: 'test@gmail.com',
          firstname: 'Nuno',
          lastname: 'Neves',
          token: 'e23fa4ff-4c68-408d-bef6-ac414c6ba99b',
          expiration: '2021-04-12T18:48:42.831002',
          type: 'COACH',
          identifier: 'ef543d94-f0db-4e17-8fa3-16e2607b4c6c'
        }
      }
    });

    expect(state).toStrictEqual({
      loggedIn: true,
      userInfo: {
        username: 'test@gmail.com',
        firstname: 'Nuno',
        lastname: 'Neves',
        token: 'e23fa4ff-4c68-408d-bef6-ac414c6ba99b',
        expiration: '2021-04-12T18:48:42.831002',
        type: 'COACH',
        identifier: 'ef543d94-f0db-4e17-8fa3-16e2607b4c6c'
      },
      errorSignup: null,
      errorLogin: null,
    });
  });

  it('check state login fail', () => {
    const state = authReducer(undefined, {
      type: AUTH_LOGIN_FAIL,
      payload: {
        error: {
          level: 'WARNING',
          message: 'Email or password invalid, please try again.'
        }
      }
    });

    expect(state).toStrictEqual({
      loggedIn: false,
      userInfo: null,
      errorSignup: null,
      errorLogin: {
        level: 'WARNING',
        message: 'Email or password invalid, please try again.'
      }
    });
  });

  it('check state login reset', () => {
    const state = authReducer(undefined, {
      type: AUTH_LOGIN_RESET
    });

    expect(state).toStrictEqual({
      loggedIn: false,
      userInfo: null,
      errorSignup: null,
      errorLogin: null
    });
  });

  it('check state signup success', () => {
    const state = authReducer(undefined, {
      type: AUTH_SIGNUP_SUCCESS,
      payload: {
        userDetails: {
          username: 'test@gmail.com',
          firstname: 'Nuno',
          lastname: 'Neves',
          token: 'e23fa4ff-4c68-408d-bef6-ac414c6ba99b',
          expiration: '2021-04-12T18:48:42.831002',
          type: 'COACH',
          identifier: 'ef543d94-f0db-4e17-8fa3-16e2607b4c6c'
        }
      }
    });

    expect(state).toStrictEqual({
      loggedIn: true,
      userInfo: {
        username: 'test@gmail.com',
        firstname: 'Nuno',
        lastname: 'Neves',
        token: 'e23fa4ff-4c68-408d-bef6-ac414c6ba99b',
        expiration: '2021-04-12T18:48:42.831002',
        type: 'COACH',
        identifier: 'ef543d94-f0db-4e17-8fa3-16e2607b4c6c'
      },
      errorSignup: null,
      errorLogin: null,
    });
  });

  it('check state signup fail', () => {
    const state = authReducer(undefined, {
      type: AUTH_SIGNUP_FAIL,
      payload: {
        error: {
          level: 'WARNING',
          message: 'Email already registed, please use another email.'
        }
      }
    });

    expect(state).toStrictEqual({
      loggedIn: false,
      userInfo: null,
      errorLogin: null,
      errorSignup: {
        level: 'WARNING',
        message: 'Email already registed, please use another email.'
      }
    });
  });

  it('check state signup reset', () => {
    const state = authReducer(undefined, {
      type: AUTH_SIGNUP_RESET
    });

    expect(state).toStrictEqual({
      loggedIn: false,
      userInfo: null,
      errorSignup: null,
      errorLogin: null
    });
  });

  it('check state logout', () => {
    const state = authReducer(undefined, {
      type: AUTH_LOGOUT
    });

    expect(state).toStrictEqual({
      loggedIn: false,
      userInfo: null,
      errorSignup: null,
      errorLogin: null
    });
  });
});
