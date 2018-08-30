import * as types from '../constants/action-types';

/**
 * Reducer for the Trick phase
 *
 * @param  {Object} state current state
 * @param  {Object} action action to perform
 * @return {Object} nextState next state
 */
export default function trick(state = [], action) {
  switch (action.type) {
    case types.PLAY_CARD:
      return [
        ...state,
        {
          card: action.card,
          player: action.playerId
        }
      ];
    default:
      return state;
  }
}
