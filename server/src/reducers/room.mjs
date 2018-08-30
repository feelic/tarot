import {
  JOIN_ROOM, LEAVE_ROOM, START_GAME, START_ROUND, PLACE_BID, PLAY_CARD, MAKE_CHIEN, AWARD_TRICK
} from '../constants/action-types';
import players from './players';
import bids from './bids';
import trick from './trick';

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
  currentTrick: [],
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
    case PLACE_BID:
      const newPlayers = players(state.players, action);
      const bidTaker = getBidTaker(newPlayers, state.playerOrder);
      const bidSpeaker =
        (bidTaker && null) || getNextPlayer(state.playerOrder, action.playerId);
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
    case MAKE_CHIEN:
      return {
        ...state,
        chien: [],
        gamePhase: gamePhases.TRICK,
        playerTurn: state.roundOpener,
        players:  players(state.players, {...action}),
      };
    case PLAY_CARD:
      const currentTrick = trick(state.currentTrick, action);

      //Trick is not over, give turn to next player
      if (Object.keys(currentTrick).length < state.playerGameNumber) {
        const nextPlayer = getNextPlayer(state.playerOrder, action.playerId);

        return {
          ...state,
          currentTrick,
          playerTurn: nextPlayer
        };
      }

      const trickWinner = getTrickWinner(currentTrick, state.playerOrder);

      //Trick is not the last, award to winner, give turn to trick winner
      if (state.players[trickWinner].hand.length > 0) {
        return {
          ...state,
          currentTrick: [],
          playerTurn: trickWinner,
          players: players(state.players, {
            type: AWARD_TRICK,
            trickWinner,
            currentTrick
          })
        };
      }

      return {
        ...state,
        gamePhase: gamePhases.ROUND_SCORES
      };
    default:
      return state;
  }
}
