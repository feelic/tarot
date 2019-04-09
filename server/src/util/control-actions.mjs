import {ADD_BOT, JOIN_ROOM, PLACE_BID, PLAY_CARD, START_GAME} from '../constants/action-types';
import {gamePhases} from '../constants';

export default function controlActions (state, action) {
  switch (action.type) {
  case JOIN_ROOM:
    return ! state || state.gamePhase === gamePhases.ROOM_SETUP;
  case START_GAME:
  case ADD_BOT:
    return state.gamePhase === gamePhases.ROOM_SETUP;
  case PLACE_BID:
    return action.playerId === state.bidSpeaker;
  case PLAY_CARD:
    return action.playerId === state.playerTurn;
  default:
    return true;
  }
}
