import * as types from '../constants/action-types';

export default function bids (state = {}, action) {
  switch (action.type) {
    case types.PLACE_BID:

      return {
        ...state,
        [action.playerId]: action.bid
      }
    default:
      return state;
  }
};
