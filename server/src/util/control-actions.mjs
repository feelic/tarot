import {PLACE_BID, PLAY_CARD} from '../constants/action-types';

export default function controlActions (state, action) {
  switch (action.type) {
  case PLACE_BID:
    return action.playerId === state.bidSpeaker;
  case PLAY_CARD:
    return action.playerId === state.playerTurn;
  default:
    return true;
  }
}
