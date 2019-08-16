import {ADD_BOT, PLACE_BID, PLAY_CARD, START_GAME} from '../constants/action-types.js';
import {roomStatuses} from '../constants/index.js';

export default function controlActions (state, action) {
  switch (action.type) {
  case START_GAME:
  case ADD_BOT:
    return state.roomStatus === roomStatuses.ROOM_SETUP;
  case PLACE_BID:
    return action.playerId === state.game.bidSpeaker;
  case PLAY_CARD:
    return action.playerId === state.game.playerTurn;
  default:
    return true;
  }
}
