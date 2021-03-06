import {
  JOIN_ROOM,
  LEAVE_ROOM,
  CHOOSE_GAME,
  START_GAME,
  ADD_BOT,
  SET_BOT_LEVEL,
  REMOVE_BOT,
  SERVER_ERROR,
  DISCONNECT
} from '../constants/action-types.js';
import {getBotPlayerName} from '../constants/bot-player-names.js';
import {roomStatuses} from '../constants/index.js';
import players from './players.js';
import gameDescriptions from '../constants/game-descriptions.js';
import games from './games/index.js';

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
  const gameReducer = games[state.selectedGame];

  switch (action.type) {
  case JOIN_ROOM:
  case ADD_BOT:
  case SET_BOT_LEVEL:
  case REMOVE_BOT:
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
    const playerIds = Object.keys(state.players).slice(0, 4);

    if (! state.selectedGame || state.playerSlots > playerIds.length) {
      return state;
    }

    return {
      ...state,
      roomStatus: roomStatuses.GAME_IN_PROGRESS,
      game: gameReducer(state.game, {...action, playerIds}, dispatch)
    };
  case SERVER_ERROR:
    return {
      ...state,
      serverError: action.error
    };
  default:
    return {
      ...state,
      game: gameReducer(state.game, action, dispatch)
    };
  }
}

export function handleRoster (state, action) {
  switch (action.type) {
  case JOIN_ROOM:
  case DISCONNECT:
  case SET_BOT_LEVEL:
  case REMOVE_BOT:
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
