import {
  JOIN_ROOM,
  LEAVE_ROOM,
  START_GAME,
  START_ROUND,
  PLACE_BID,
  PLAY_CARD,
  MAKE_CHIEN,
  AWARD_TRICK,
  AWARD_ROUND
} from '../constants/action-types';
import players from './players';
import trick from './trick';

import {getBidTaker} from '../util/bids';
import {getTrickWinner, dealCards} from '../util/cards';
import {getNextPlayer} from '../util/players';
import {gamePhases} from '../constants';

const initialState = {
  gamePhase: gamePhases.ROOM_SETUP,
  players: {},
  playerOrder: [],
  playerGameNumber: 4,
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
export default function room (state = initialState, action, dispatch) {
  switch (action.type) {
  case JOIN_ROOM:
    return {
      ...state,
      players: players(state.players, action),
      playerOrder: [...state.playerOrder, action.playerId]
    };
  case LEAVE_ROOM:
    if (Object.keys(state.players).length - 1 === 0) {
      return initialState;
    }

    return {
      ...state,
      players: players(state.players, action)
    };
  case START_GAME:
  case START_ROUND:
    const deal = dealCards(state.players.length);
    const roundOpenerIdx = state.playerOrder.indexOf(state.roundOpener) + 1;
    const roundOpener
        = state.playerOrder[roundOpenerIdx % state.playerOrder.length];

    return {
      ...state,
      gamePhase: gamePhases.BIDDING,
      players: players(state.players, {...action, deal: deal.hands}),
      chien: deal.chien,
      roundOpener,
      bidSpeaker: roundOpener
    };
  case PLACE_BID:
    return handleBidding(state, action);
  case MAKE_CHIEN:
    return {
      ...state,
      chien: [],
      gamePhase: gamePhases.TRICK,
      playerTurn: state.roundOpener,
      players: players(state.players, action)
    };
  case PLAY_CARD:
    return handleTrick(state, action, dispatch);
  case AWARD_TRICK:
    return {
      ...state,
      currentTrick: [],
      playerTurn: action.trickWinner,
      players: players(state.players, action)
    };
  case AWARD_ROUND:
    return {
      ...state,
      gamePhase: gamePhases.ROUND_SCORES
    };
  default:
    return state;
  }
}

export function handleBidding (state, action) {
  const newPlayers = players(state.players, action);
  const bidTaker = getBidTaker(newPlayers, state.playerOrder);
  const bidSpeaker
    = (bidTaker && null) || getNextPlayer(state.playerOrder, action.playerId);
  const gamePhase
    = (bidTaker === 'nobody' && gamePhases.FAILED_BIDDING)
    || (bidTaker && gamePhases.CHIEN_REVEAL)
    || gamePhases.BIDDING;

  return {
    ...state,
    players: newPlayers,
    bidTaker,
    bidSpeaker,
    gamePhase
  };
}

export function handleTrick (state, action, dispatch) {
  const currentTrick = trick(state.currentTrick, action);
  const trickWinner = getTrickWinner(currentTrick, state.playerOrder);

  //card is last of trick
  if (trickWinner) {
    setTimeout(() => {
      dispatch({
        type: AWARD_TRICK,
        trickWinner,
        trick: currentTrick.map(play => play.card)
      });
    }, 3000);
  }

  //Trick is last of round, go to score board
  if (trickWinner && state.players[trickWinner].hand.length === 0) {
    setTimeout(() => {
      dispatch({
        type: AWARD_ROUND
      });
    }, 6000);
  }

  const nextPlayer = getNextPlayer(state.playerOrder, action.playerId);

  return {
    ...state,
    currentTrick,
    playerTurn: nextPlayer,
    players: players(state.players, action)
  };
}
