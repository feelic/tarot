import {
  JOIN_ROOM,
  LEAVE_ROOM,
  START_GAME,
  START_ROUND,
  PLACE_BID,
  PLAY_CARD,
  MAKE_CHIEN,
  AWARD_TRICK,
  AWARD_ROUND,
  ADD_BOT,
  AWARD_BID
} from '../constants/action-types';
import {getBotPLayerName} from '../constants/bot-player-names';
import players from './players';
import trick from './trick';

import {getBidTaker} from '../util/bids';
import {getTrickWinner, dealCards} from '../util/cards';
import {getNextPlayer} from '../util/players';
import {gamePhases} from '../constants';

const {
  ROOM_SETUP,
  BIDDING,
  CHIEN_REVEAL,
  TRICK,
  ROUND_SCORES,
  FAILED_BIDDING
} = gamePhases;

const initialState = {
  gamePhase: ROOM_SETUP,
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
  case ADD_BOT:
  case LEAVE_ROOM:
    return handleRoster(state, action);
  case START_GAME:
  case START_ROUND:
    const deal = dealCards(state.players.length);
    const roundOpenerIdx = state.playerOrder.indexOf(state.roundOpener) + 1;
    const roundOpener
        = state.playerOrder[roundOpenerIdx % state.playerOrder.length];

    return {
      ...state,
      gamePhase: BIDDING,
      players: players(state.players, {...action, deal: deal.hands}),
      chien: deal.chien,
      roundOpener,
      bidSpeaker: roundOpener
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
    return handleTrick(state, action, dispatch);
  case AWARD_TRICK:
    return {
      ...state,
      currentTrick: [],
      playerTurn: action.trickWinner,
      players: players(state.players, action),
      trickWinner: null
    };
  case AWARD_ROUND:
    return {
      ...state,
      gamePhase: ROUND_SCORES
    };
  default:
    return state;
  }
}

export function handleRoster (state, action) {
  switch (action.type) {
  case JOIN_ROOM:
    if (state.playerGameNumber === state.playerOrder.length) {
      return state;
    }

    return {
      ...state,
      players: players(state.players, action),
      playerOrder: [...state.playerOrder, action.playerId]
    };
  case ADD_BOT:
    if (state.playerGameNumber === state.playerOrder.length) {
      return state;
    }
    const botName = getBotPLayerName();

    return {
      ...state,
      players: players(state.players, {
        ...action,
        username: botName,
        playerId: botName
      }),
      playerOrder: [...state.playerOrder, botName]
    };

  case LEAVE_ROOM:
    if (Object.keys(state.players).length - 1 === 0) {
      return initialState;
    }
    const leaverIndex = state.playerOrder.indexOf(action.playerId);

    return {
      ...state,
      playerOrder: [
        ...state.playerOrder.slice(0, leaverIndex),
        ...state.playerOrder.slice(leaverIndex + 1)
      ],
      players: players(state.players, action)
    };
  default:
    return state;
  }
}

export function handleBidding (state, action, dispatch) {
  switch (action.type) {
  case AWARD_BID:
    const gamePhase
        = (action.bidTaker === 'nobody' && FAILED_BIDDING) || CHIEN_REVEAL;

    if (gamePhase === FAILED_BIDDING) {
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
      bidTaker: action.bidTaker,
      gamePhase
    };
  case PLACE_BID:
    const newPlayers = players(state.players, action);
    const bidTaker = getBidTaker(newPlayers, state.playerOrder);
    const nextPlayer = getNextPlayer(state.playerOrder, action.playerId);
    const bidSpeaker = (bidTaker && null) || nextPlayer;

    if (bidTaker) {
      setTimeout(() => {
        dispatch({
          type: AWARD_BID,
          room: action.room,
          playerId: 'SERVER',
          bidTaker
        });
      }, 2000);
    }

    return {
      ...state,
      players: newPlayers,
      bidSpeaker,
      gamePhase: BIDDING
    };
  default:
    return state;
  }
}

export function handleTrick (state, action, dispatch) {
  const currentTrick = trick(state.currentTrick, action);
  const isTrickComplete = currentTrick.length === state.playerGameNumber;
  const trickWinner = (isTrickComplete && getTrickWinner(currentTrick)) || null;
  const isTrickLast
    = isTrickComplete && state.players[trickWinner].hand.length === 0;

  //card is last of trick
  if (isTrickComplete) {
    setTimeout(() => {
      dispatch({
        type: AWARD_TRICK,
        room: action.room,
        playerId: 'SERVER',
        trickWinner,
        trick: currentTrick.map(play => play.card)
      });
    }, 2000);
  }

  //Trick is last of round, go to score board
  if (isTrickLast) {
    setTimeout(() => {
      dispatch({
        type: AWARD_ROUND,
        room: action.room,
        playerId: 'SERVER'
      });
    }, 4000);
  }

  const nextPlayer
    = (! isTrickComplete && getNextPlayer(state.playerOrder, action.playerId))
    || null;

  return {
    ...state,
    currentTrick,
    trickWinner,
    playerTurn: nextPlayer,
    players: players(state.players, action)
  };
}
