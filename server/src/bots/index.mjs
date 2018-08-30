import {dispatch} from '../game';
import placeBid from './place-bid';
import playCard from './play-card';

import {PLACE_BID, PLAY_CARD} from '../constants/action-types';

export function playBotturn (state) {
  const playerId = state.currentPlayer;
  const hand = state.players[playerId].hand;

  if (state.bidSpeaker === playerId) {
    const bid = placeBid(state.players, hand);

    return dispatch({type: PLACE_BID, bid, playerId});
  }
  if (state.playerTurn === playerId) {
    const card = playCard(state.currentTrick, hand);

    return dispatch({type: PLAY_CARD, card, playerId});
  }
  return null;
}
