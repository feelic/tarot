import {
  JOIN_ROOM,
  LEAVE_ROOM,
  ADD_BOT,
  REMOVE_BOT,
  DISCONNECT
} from '../constants/action-types';

const initialState = {};
const initialPlayer = {};

/**
 * Reducer for the Players In a room
 *
 * @param  {Object} state current state
 * @param  {Object} action action to perform
 * @return {Object} nextState next state
 */
export default function players (state = initialState, action) {
  switch (action.type) {
  case JOIN_ROOM:
  case ADD_BOT:
    return {
      ...state,
      [action.playerId]: player(initialPlayer, action)
    };
  case DISCONNECT:
    return {
      ...state,
      [action.playerId]: player(state[action.playerId], action)
    };
  case LEAVE_ROOM:
  case REMOVE_BOT:
    const targetId
        = (action.type === LEAVE_ROOM && action.playerId)
        || (action.type === REMOVE_BOT && action.botId);
    const newState = {...state};

    delete newState[targetId];

    return newState;
  default:
    return state;
  }
}

export function player (state = initialPlayer, action) {
  switch (action.type) {
  case JOIN_ROOM:
  case ADD_BOT:
    return {
      ...state,
      username: action.username,
      id: action.playerId,
      socketId: action.socketId,
      connected: true,
      bot: action.type === ADD_BOT
    };
  case DISCONNECT:
    return {
      ...state,
      connected: false
    };
  default:
    return state;
  }
}
