import {PLAY_CARD, AWARD_TRICK, AWARD_ROUND} from '../constants/action-types';
import {getTrickWinner} from '../util/cards';
import {getNextPlayer} from '../util/players';
import {gamePhases} from '../constants';
import players from './players';
import {getRoundScores} from '../util/scores';

const {ROUND_SCORES} = gamePhases;

/**
 * Reducer for the Trick phase
 *
 * @param  {Object} state current state
 * @param  {Object} action action to perform
 * @return {Object} nextState next state
 */
/* eslint-disable complexity */
export default function trick (state = [], action, dispatch) {
  switch (action.type) {
  case PLAY_CARD:
    const currentTrick = [
      ...state.currentTrick,
      {
        card: action.card,
        player: action.playerId
      }
    ];
    const isTrickComplete = currentTrick.length === state.playerGameNumber;
    const trickWinner
        = (isTrickComplete && getTrickWinner(currentTrick)) || null;
    const nextPlayer
        = (! isTrickComplete
          && getNextPlayer(state.playerOrder, action.playerId))
        || null;

      //card is last of trick
    if (isTrickComplete) {
      setTimeout(() => {
        dispatch({
          type: AWARD_TRICK,
          room: action.room,
          trickWinner,
          playerId: 'SERVER',
          trick: currentTrick
        });
      }, 2000);
    }

    return {
      ...state,
      currentTrick,
      trickWinner,
      playerTurn: nextPlayer,
      players: players(state.players, action)
    };
  case AWARD_TRICK:
    const isTrickLast = state.players[action.trickWinner].hand.length === 0;

    //Trick is last of round, go to score board
    if (isTrickLast) {
      setTimeout(() => {
        dispatch({
          type: AWARD_ROUND,
          room: action.room,
          playerId: 'SERVER'
        });
      }, 2000);
    }

    return {
      ...state,
      currentTrick: [],
      playerTurn: ! isTrickLast && action.trickWinner,
      players: players(state.players, action),
      trickWinner: null
    };
  case AWARD_ROUND:
    const roundScores = getRoundScores(state);

    console.log(JSON.stringify(roundScores, null, 2))
    return {
      ...state,
      gamePhase: ROUND_SCORES,
      players: players(state.players, {...action, scores: roundScores.scores}),
      scores: roundScores.details
    };
  default:
    return state;
  }
}
