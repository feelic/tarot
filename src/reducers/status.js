import {DEAL, PLAY_CARD} from '../constants/action-types';

const initialState = {
  playerOrder: [],
  chien: [],
  roundOpener: null,
  trickWinner: null,
  tricksRemaining: 18
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
  case DEAL:
    return {...state, chien: action.chien};
  case PLAY_CARD:
    return {
      ...state,
      currentTrick: {...state.currentTrick, [action.player]: action.card}
    };
  default:
    return state;
  }
}
