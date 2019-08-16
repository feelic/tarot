import {dispatch} from '../dispatch.js';
import placeBid from './place-bid.js';
import playCard from './play-card.js';
import makeChien from './make-chien.js';

import {gamePhases, roomStatuses} from '../constants/index.js';
import {PLACE_BID, PLAY_CARD, MAKE_CHIEN} from '../constants/action-types.js';

const BOT_ACTION_DELAY = 400;

export function playBotturn (room, state) {
  const playerId = state.currentPlayer;
  const game = state.game;

  if (! game || state.roomStatus === roomStatuses.ROOM_SETUP) {
    return null;
  }

  const hand = game.players[playerId].hand;

  if (game.bidSpeaker === playerId && game.gamePhase === gamePhases.BIDDING) {
    const bid = placeBid(game.players, hand);

    return delayedDispatch({room, type: PLACE_BID, bid, playerId});
  }
  if (game.bidTaker === playerId && game.gamePhase === gamePhases.CHIEN_REVEAL) {
    const {updatedHand, discarded} = makeChien(hand, game.chien);

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
  if (game.playerTurn === playerId && game.gamePhase === gamePhases.TRICK) {
    const card = playCard(game.currentTrick, hand);

    return delayedDispatch({room, type: PLAY_CARD, card, playerId});
  }
  return null;
}

function delayedDispatch (action, delay = BOT_ACTION_DELAY) {
  return setTimeout(() => dispatch(action), delay);
}
