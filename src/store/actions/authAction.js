import * as actionType from './actionsType';

export const loggedIn = (username) => {
  const isAuth = username === 'nbento';

  return {
    type: actionType.AUTH_LOGIN,
    auth: isAuth
  };
};

export const loggedOut = () => {
  return {
    type: actionType.AUTH_LOGOUT
  };
};
