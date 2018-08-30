import {dispatch} from '../game';
import placeBid from './place-bid';
import playCard from './play-card';

import {PLACE_BID, PLAY_CARD} from '../constants/action-types';

const BOT_ACTION_DELAY = 400;

export function playBotturn (room, state) {
  const playerId = state.currentPlayer;
  const hand = state.players[playerId].hand;

  if (state.bidSpeaker === playerId) {
    const bid = placeBid(state.players, hand);

    return delayedDispatch({room, type: PLACE_BID, bid, playerId});
  }
  if (state.playerTurn === playerId) {
    const card = playCard(state.currentTrick, hand);

    return delayedDispatch({room, type: PLAY_CARD, card, playerId});
  }
  return null;
}

function delayedDispatch (action) {
  return setTimeout(() => dispatch(action), BOT_ACTION_DELAY);
}
