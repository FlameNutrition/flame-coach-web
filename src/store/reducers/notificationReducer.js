import update from 'immutability-helper';
import * as actionType from '../actions/actionsType';

const initialState = {
  message: null
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.NOTIFICATION:
      return update(state, {
        message: { $set: action.payload.message }
      });
    default:
      return state;
  }
};

export default notificationReducer;
