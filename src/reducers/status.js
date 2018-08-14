import {
  DEAL,
  PLAY_CARD,
  TRICK_START,
  AWARD_TRICK,
  MAKE_CHIEN,
  PLACE_BID,
  AWARD_BID
} from '../constants/action-types';

const initialState = {
  playerOrder: [],
  chien: [],
  roundOpener: null,
  trickWinner: null,
  tricksRemaining: 18,
  bids: {},
  bidSpeaker: null,
  bidTaker: null
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
    return {
      ...state,
      chien: action.chien,
      bids: {},
      roundOpener: action.openingPlayer,
      bidSpeaker: action.openingPlayer
    };
  case PLACE_BID:
    return {
      ...state,
      bids: {...state.bids, [action.player]: action.bid},
      bidSpeaker: action.nextPlayer
    };
  case AWARD_BID:
    return {...state, bidTaker: action.player};
  case MAKE_CHIEN:
    return {...state, chien: {}};
  case TRICK_START:
    return {
      ...state,
      currentTrick: {}
    };
  case PLAY_CARD:
    return {
      ...state,
      currentTrick: {...state.currentTrick, [action.player]: action.card}
    };
  case AWARD_TRICK:
    return {
      ...state,
      currentTrick: {},
      trickWinner: action.player,
      tricksRemaining: state.tricksRemaining - 1
    };
  default:
    return state;
  }
}
