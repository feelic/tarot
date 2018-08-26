import * as types from '../constants/action-types';

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
export default function players(state = initialState, action) {
  switch (action.type) {
    case types.JOIN_ROOM:
      return {
        ...state,
        [action.playerId]: player(initialPlayer, action)
      };
    case types.LEAVE_ROOM:
      const newState = {...state};

      delete newState[action.playerId];

      return newState;
    case types.START_GAME:
    case types.START_ROUND:
      return Object.keys(state).reduce((newState, playerId, idx) => {
        return {
          ...newState,
          [playerId]: {
            ...state[playerId],
            hand: action.deal[idx],
            tricks: [],
            bid: false
          }
        };
      }, {});
    case types.PLACE_BID:
    case types.MAKE_CHIEN:
    case types.PLAY_CARD:
      return {
        ...state,
        [action.playerId]: player(state[action.playerId], action)
      };
    default:
      return state;
  }
}

export function player(state = initialPlayer, action) {
  switch (action.type) {
    case types.CREATE_ROOM:
    case types.JOIN_ROOM:
      return {
        ...state,
        username: action.username,
        id: action.playerId
      };
    case types.PLACE_BID:
      return {
        ...state,
        bid: action.bid
      };
    case types.MAKE_CHIEN:
      return {
        ...state,
        tricks: [...action.chien]
      };
    case types.PLAY_CARD:
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
