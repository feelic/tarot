import {getAllowedCards} from '../util/cards.js';

export default function (game, playerId) {
  const {currentTrick, players} = game;
  const {hand} = players[playerId];

  console.log(currentTrick, hand);
  const allowedCards = getAllowedCards(currentTrick, hand);
  const isBidTaker = game.bidTaker === playerId;

  // play randomly from the allowed cards
  // const cardIndex = Math.floor(Math.random() * allowedCards.length);

  // play highest allowed card
  const cardIndex = allowedCards.length - 1;

  return allowedCards[cardIndex];
}
