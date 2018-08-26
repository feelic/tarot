import * as types from '../constants/action-types';

export default function controlActions (state, action) {
  switch (action.type) {
    case types.PLACE_BID:
      return action.playerId === state.bidSpeaker;
    case types.PLACE_BID:
      return action.playerId === state.playerTurn;
    default:
      return true;
  }
}
