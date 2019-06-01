import {
  JOIN_ROOM,
  LEAVE_ROOM,
  CHOOSE_GAME,
  START_GAME,
  ADD_BOT,
  SERVER_ERROR,
  DISCONNECT
} from '../constants/action-types';
import {getBotPlayerName} from '../constants/bot-player-names';
import {roomStatuses} from '../constants';
import players from './players';
import gameDescriptions from '../constants/game-descriptions';
import games from './games';

const initialState = {
  selectedGame: null,
  playerSlots: 0,
  game: {},
  players: {},
  roomStatus: roomStatuses.ROOM_SETUP
};

/**
 * Reducer for the Game Room
 *
 * @param  {Object} state current state
 * @param  {Object} action action to perform
 * @return {Object} nextState next state
 */
export default function room (state = initialState, action, dispatch) {
  switch (action.type) {
  case JOIN_ROOM:
  case ADD_BOT:
  case LEAVE_ROOM:
  case DISCONNECT:
    return handleRoster(state, action);
  case CHOOSE_GAME:
    const gameDescription = gameDescriptions[action.game];

    return {
      ...state,
      selectedGame: gameDescription.name,
      playerSlots: gameDescription.playerSlots
    };
  case START_GAME:
    const playerIds = Object.keys(state.players);

    if (! state.selectedGame || state.playerSlots > playerIds.length) {
      return state;
    }

    const gameReducer = games[state.selectedGame];

    return {
      ...state,
      status: roomStatuses.GAME_IN_PROGRESS,
      game: gameReducer(state.game, {...action, playerIds}, dispatch)
    };
  case SERVER_ERROR:
    return {
      ...state,
      serverError: action.error
    };
  default:
    return state;
  }
}

export function handleRoster (state, action) {
  switch (action.type) {
  case JOIN_ROOM:
  case DISCONNECT:
    return {
      ...state,
      players: players(state.players, action)
    };
  case ADD_BOT:
    const botName = getBotPlayerName();

    return {
      ...state,
      players: players(state.players, {
        ...action,
        username: botName,
        playerId: botName
      })
    };

  case LEAVE_ROOM:
    if (Object.keys(state.players).length - 1 === 0) {
      return initialState;
    }

    return {
      ...state,
      players: players(state.players, action)
    };
  default:
    return state;
  }
}
