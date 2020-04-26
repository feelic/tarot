import {dispatch} from '../dispatch.js';
import placeBid from './place-bid.js';
import playCard from './play-card/index.js';
import makeChien from './make-chien.js';

import {gamePhases, roomStatuses} from '../constants/index.js';
import {PLACE_BID, PLAY_CARD, MAKE_CHIEN} from '../constants/action-types.js';
import {
  BOT_PLAY_CARD_DELAY,
  BOT_PLACE_BID_DELAY,
  BOT_MAKE_CHIEN_DELAY
} from '../constants/action-delays.js';

export function playBotturn (room, state) {
  const playerId = state.currentPlayer;
  const game = state.game;

  if (! game || state.roomStatus === roomStatuses.ROOM_SETUP) {
    return null;
  }

  const hand = game.players[playerId].hand;

  if (game.bidSpeaker === playerId && game.gamePhase === gamePhases.BIDDING) {
    const bid = placeBid(game.players, hand);

    return delayedDispatch(
      {room, type: PLACE_BID, bid, playerId},
      BOT_PLACE_BID_DELAY
    );
  }
  if (
    game.bidTaker === playerId
    && game.gamePhase === gamePhases.CHIEN_REVEAL
  ) {
    const {updatedHand, discarded} = makeChien(hand, game.chien);

    return delayedDispatch(
      {
        room,
        type: MAKE_CHIEN,
        hand: updatedHand,
        chien: discarded,
        playerId
      },
      BOT_MAKE_CHIEN_DELAY
    );
  }
  if (game.playerTurn === playerId && game.gamePhase === gamePhases.TRICK) {
    const card = playCard(game, playerId);

    return delayedDispatch({room, type: PLAY_CARD, card, playerId});
  }
  return null;
}

function delayedDispatch (action, delay = BOT_PLAY_CARD_DELAY) {
  return setTimeout(() => dispatch(action), delay);
}
