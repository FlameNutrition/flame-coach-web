import * as actionType from './actionsType';

// eslint-disable-next-line import/prefer-default-export
export const notification = () => {
  return {
    type: actionType.NOTIFICATION,
    payload: {
      message: 'Hello'
    }
  };
};
