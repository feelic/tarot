import * as types from '../constants/action-types';
import players from './players';
import bids from './bids';
import {getBidTaker} from '../util/bids';
import {getTrickWinner, dealCards} from '../util/cards';
import {getNextPlayer} from '../util/players';
import {gamePhases, bidOptions} from '../constants';

const initialState = {
  gamePhase: gamePhases.ROOM_SETUP,
  players: {},
  playerOrder: [],
  playerGameNumber: 4,
  chien: [],
  roundOpener: null,
  trickWinner: null,
  playerTurn: null,
  tricksRemaining: 18,
  bids: {},
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
export default function room(state = initialState, action) {
  switch (action.type) {
    case types.JOIN_ROOM:
      return {
        ...state,
        players: players(state.players, action),
        playerOrder: [...state.playerOrder, action.playerId]
      };
    case types.LEAVE_ROOM:
      if (Object.keys(state.players).length - 1 === 0) {
        return initialState;
      }

      return {
        ...state,
        players: players(state.players, action)
      };
    case types.START_GAME:
    case types.START_ROUND:
      const deal = dealCards(state.players.length);
      const roundOpenerIdx = state.playerOrder.indexOf(state.roundOpener) + 1;
      const roundOpener =
        state.playerOrder[roundOpenerIdx % state.playerOrder.length];

      return {
        ...state,
        gamePhase: gamePhases.BIDDING,
        players: players(state.players, {...action, deal: deal.hands}),
        chien: deal.chien,
        roundOpener,
        bidSpeaker: roundOpener
      };
    case types.PLACE_BID:
      const newPlayers = players(state.players, action);
      const bidTaker = getBidTaker(newPlayers, state.playerOrder);
      const bidSpeaker = getNextPlayer(state.playerOrder, action.playerId);
      const gamePhase =
        (bidTaker === 'nobody' && gamePhases.FAILED_BIDDING) ||
        (bidTaker && gamePhases.CHIEN_REVEAL) ||
        gamePhases.BIDDING;
      return {
        ...state,
        players: newPlayers,
        bidTaker,
        bidSpeaker,
        gamePhase
      };
    case types.MAKE_CHIEN:
      return {
        ...state,
        chien: [],
        gamePhase: gamePhases.TRICK
      };
    case types.PLAY_CARD:
      const currentTrick = trick(state.currentTrick, action);
      const trickWinner = getTrickWinner(currentTrick, playerOrder);
      const nextPlayer = getNextPlayer(playerOrder, action.playerId);
      return {
        ...state,
        currentTrick: {...state.currentTrick, [action.player]: action.card},
        players: players(state.players, action)
      };
    default:
      return state;
  }
}
