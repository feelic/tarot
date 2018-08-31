import {dispatch} from '../game';
import placeBid from './place-bid';
import playCard from './play-card';
import makeChien from './make-chien';

import {gamePhases} from '../constants';
import {PLACE_BID, PLAY_CARD, MAKE_CHIEN} from '../constants/action-types';

const BOT_ACTION_DELAY = 400;

export function playBotturn (room, state) {
  const playerId = state.currentPlayer;
  const hand = state.players[playerId].hand;

  if (state.bidSpeaker === playerId) {
    const bid = placeBid(state.players, hand);

    return delayedDispatch({room, type: PLACE_BID, bid, playerId});
  }
  if (state.bidTaker === playerId && state.gamePhase === gamePhases.CHIEN_REVEAL) {
    const {updatedHand, discarded} = makeChien(hand, state.chien);

    console.log(updatedHand.length);
    console.log(updatedHand);
    console.log(discarded.length);
    console.log(discarded);
    return delayedDispatch(
      {
        room,
        type: MAKE_CHIEN,
        hand: updatedHand,
        chien: discarded,
        playerId
      },
      5000
    );
  }
  if (state.playerTurn === playerId) {
    const card = playCard(state.currentTrick, hand);

    return delayedDispatch({room, type: PLAY_CARD, card, playerId});
  }
  return null;
}

function delayedDispatch (action, delay = BOT_ACTION_DELAY) {
  return setTimeout(() => dispatch(action), delay);
}
