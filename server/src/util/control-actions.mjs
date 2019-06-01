import {ADD_BOT, PLACE_BID, PLAY_CARD, START_GAME} from '../constants/action-types';
import {roomStatuses} from '../constants';

export default function controlActions (state, action) {
  switch (action.type) {
  case START_GAME:
  case ADD_BOT:
    return state.roomStatus === roomStatuses.ROOM_SETUP;
  case PLACE_BID:
    return action.playerId === state.bidSpeaker;
  case PLAY_CARD:
    return action.playerId === state.playerTurn;
  default:
    return true;
  }
}
