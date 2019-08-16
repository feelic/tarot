import {
  START_GAME,
  START_ROUND,
  PLACE_BID,
  PLAY_CARD,
  MAKE_CHIEN,
  AWARD_TRICK,
  AWARD_ROUND,
  AWARD_BID
} from '../../constants/action-types.js';
import players from './tarot-players.js';
import trick from './trick.js';

import {getBidTaker} from '../../util/bids.js';
import {dealCards} from '../../util/cards.js';
import {getNextPlayer} from '../../util/players.js';
import {gamePhases} from '../../constants/index.js';

const {BIDDING, CHIEN_REVEAL, TRICK} = gamePhases;

const initialState = {
  gamePhase: null,
  players: {},
  playerOrder: [],
  chien: [],
  roundOpener: null,
  currentTrick: [],
  trickWinner: null,
  playerTurn: null,
  tricksRemaining: 18,
  bidSpeaker: null,
  bidTaker: null
};

/**
 * Reducer for the Game Room
 *
 * @param  {Object} state current state
 * @param  {Object} action action to perform
 * @return {Object} nextState next state
 */
export default function game (state = initialState, action, dispatch) {
  switch (action.type) {
  case START_GAME:
    return game(
      {
        ...initialState,
        players: players({}, action)
      },
      {type: START_ROUND},
      dispatch
    );
  case START_ROUND:
    const deal = dealCards(state.players.length);
    const playerOrder = Object.keys(state.players);
    const roundOpenerIdx = playerOrder.indexOf(state.roundOpener) + 1;
    const roundOpener = playerOrder[roundOpenerIdx % playerOrder.length];

    return {
      ...state,
      gamePhase: BIDDING,
      players: players(state.players, {...action, deal: deal.hands}),
      chien: deal.chien,
      roundOpener,
      bidSpeaker: roundOpener,
      trickWinner: null,
      playerTurn: null,
      tricksRemaining: 18,
      bidTaker: null
    };
  case AWARD_BID:
  case PLACE_BID:
    return handleBidding(state, action, dispatch);
  case MAKE_CHIEN:
    return {
      ...state,
      chien: [],
      gamePhase: TRICK,
      playerTurn: state.roundOpener,
      players: players(state.players, action)
    };
  case PLAY_CARD:
  case AWARD_TRICK:
  case AWARD_ROUND:
    return trick(state, action, dispatch);
  default:
    return state;
  }
}

export function handleBidding (state, action, dispatch) {
  switch (action.type) {
  case AWARD_BID:
    return {
      ...state,
      bidTaker: action.bidTaker,
      gamePhase: CHIEN_REVEAL,
      bid: action.bid
    };
  case PLACE_BID:
    const playerOrder = Object.keys(state.players);
    const newPlayers = players(state.players, action);
    const bidTaker = getBidTaker(newPlayers);
    const nextPlayer = getNextPlayer(playerOrder, action.playerId);
    const bidSpeaker = (! bidTaker && nextPlayer) || null;
    const biddingFailed = bidTaker === 'nobody';

    if (! biddingFailed && bidTaker) {
      const winningBid = state.players[bidTaker].bid;

      setTimeout(() => {
        dispatch({
          type: AWARD_BID,
          room: action.room,
          playerId: 'SERVER',
          bidTaker,
          bid: winningBid
        });
      }, 2000);
    }

    if (biddingFailed) {
      setTimeout(() => {
        dispatch({
          type: START_ROUND,
          room: action.room,
          playerId: 'SERVER'
        });
      }, 4000);
    }

    return {
      ...state,
      players: newPlayers,
      bidSpeaker,
      gamePhase: BIDDING,
      bidTaker
    };
  default:
    return state;
  }
}
