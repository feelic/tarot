import {
  INIT_GAME,
  DEAL,
  PLAY_CARD,
  AWARD_TRICK,
  MAKE_CHIEN
} from '../constants/action-types';

const initialState = {
  a: {}
};
const initialPlayer = {
  hand: [],
  tricks: []
};

/**
 * Reducer for the Author details
 *
 * @param  {Object} state current state
 * @param  {Object} action action to perform
 * @return {Object} nextState next state
 */
export default function data (state = initialState, action) {
  switch (action.type) {
  case INIT_GAME:
    return action.players.reduce((prev, curr) => {
      return {
        ...prev,
        [curr]: {
          ...initialPlayer,
          name: curr
        }
      };
    }, {});
  case MAKE_CHIEN:
    return {...state, chien: {}};
  case DEAL:
    return Object.keys(state).reduce((prev, curr, idx) => {
      return {
        ...prev,
        [curr]: {
          ...state[curr],
          hand: action.hands[idx],
          tricks: []
        }
      };
    }, {});
  case PLAY_CARD:
  case AWARD_TRICK:
    return {
      ...state,
      [action.player]: player(state[action.player], action)
    };
  default:
    return state;
  }
}

export function player (state = initialPlayer, action) {
  switch (action.type) {
  case INIT_GAME:
    return state;
  case PLAY_CARD:
    const cardIndex = state.hand.indexOf(action.card);

    return {
      ...state,
      hand: [
        ...state.hand.slice(0, cardIndex),
        ...state.hand.slice(cardIndex + 1)
      ]
    };
  case AWARD_TRICK:
  default:
    return state;
  }
}
