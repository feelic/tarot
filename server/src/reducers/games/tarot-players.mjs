import {
  AWARD_TRICK,
  AWARD_ROUND,
  START_GAME,
  START_ROUND,
  PLACE_BID,
  MAKE_CHIEN,
  PLAY_CARD
} from '../../constants/action-types';

const initialState = {};
const initialPlayer = {
  hand: [],
  tricks: [],
  bid: false,
  score: 0
};

/**
 * Reducer for the Players In a room
 *
 * @param  {Object} state current state
 * @param  {Object} action action to perform
 * @return {Object} nextState next state
 */
export default function players (state = initialState, action) {
  switch (action.type) {
  case START_GAME:
    return action.playerIds.reduce((prev, playerId) => {
      return {...prev, [playerId]: {...initialPlayer, id: playerId}};
    }, {});
  case START_ROUND:
    return Object.keys(state).reduce((prev, playerId, idx) => {
      return {
        ...prev,
        [playerId]: {
          ...state[playerId],
          hand: action.deal[idx],
          tricks: [],
          bid: false
        }
      };
    }, {});
  case PLACE_BID:
  case MAKE_CHIEN:
  case PLAY_CARD:
    return {
      ...state,
      [action.playerId]: player(state[action.playerId], action)
    };
  case AWARD_TRICK:
    return {
      ...state,
      ...getTrickCards(action.trick, action.trickWinner).reduce((prev, curr) => {
        const {playerId, cards} = curr;

        return {
          ...prev,
          [playerId]: player(state[playerId], {...action, cards})
        };
      }, {})
    };
  case AWARD_ROUND:
    return Object.keys(state).reduce((prev, playerId) => {
      return {
        ...prev,
        [playerId]: {
          ...state[playerId],
          score: state[playerId].score + action.scores[playerId]
        }
      };
    }, {});
  default:
    return state;
  }
}

export function player (state = initialPlayer, action) {
  switch (action.type) {
  case PLACE_BID:
    return {
      ...state,
      bid: action.bid
    };
  case MAKE_CHIEN:
    return {
      ...state,
      hand: [...action.hand],
      tricks: [...action.chien]
    };
  case AWARD_TRICK:
    return {
      ...state,
      tricks: [...state.tricks, ...action.cards]
    };
  case PLAY_CARD:
    const cardIndex = state.hand.indexOf(action.card);

    return {
      ...state,
      hand: [
        ...state.hand.slice(0, cardIndex),
        ...state.hand.slice(cardIndex + 1)
      ]
    };
  default:
    return state;
  }
}

export function getTrickCards (trick, trickWinner) {
  const excusePlayed = trick.find(play => play.card === 'trumps-00');

  if (! excusePlayed) {
    return [{playerId: trickWinner, cards: trick.map(play => play.card)}];
  }

  const excusePlayer = excusePlayed.player;
  const trickCards = trick.map(play => play.card);
  const excuseIndex = trickCards.indexOf('trumps-00');

  return [
    {
      playerId: trickWinner,
      cards: [
        trickCards.slice(0, excuseIndex),
        trickCards.slice(excuseIndex + 1)
      ]
    },
    {playerId: excusePlayer, cards: ['trumps-00']}
  ];
}
