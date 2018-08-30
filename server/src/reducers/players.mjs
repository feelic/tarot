import {
  AWARD_TRICK,
  JOIN_ROOM,
  LEAVE_ROOM,
  START_GAME,
  START_ROUND,
  PLACE_BID,
  MAKE_CHIEN,
  PLAY_CARD,
  ADD_BOT
} from '../constants/action-types';

const initialState = {};
const initialPlayer = {
  hand: [],
  tricks: [],
  bid: false,
  score: 0
};

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
  case LEAVE_ROOM:
    const newState = {...state};

    delete newState[action.playerId];

    return newState;
  case START_GAME:
  case START_ROUND:
    return Object.keys(state).reduce((prev, playerId, idx) => {
      return {
        ...prev,
        [playerId]: {
          ...state[playerId],
          hand: action.deal[idx],
          tricks: [],
          bid: false
        }
      };
    }, {});
  case PLACE_BID:
  case MAKE_CHIEN:
  case PLAY_CARD:
    return {
      ...state,
      [action.playerId]: player(state[action.playerId], action)
    };
  case AWARD_TRICK:
    return {
      ...state,
      [action.trickWinner]: player(state[action.trickWinner], action)
    };
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
      bot: action.type === ADD_BOT
    };
  case PLACE_BID:
    return {
      ...state,
      bid: action.bid
    };
  case MAKE_CHIEN:
    return {
      ...state,
      hand: [...action.hand],
      tricks: [...action.chien]
    };
  case AWARD_TRICK:
    return {
      ...state,
      tricks: [...action.trick]
    };
  case PLAY_CARD:
    const cardIndex = state.hand.indexOf(action.card);

    return {
      ...state,
      hand: [
        ...state.hand.slice(0, cardIndex),
        ...state.hand.slice(cardIndex + 1)
      ]
    };
  default:
    return state;
  }
}
