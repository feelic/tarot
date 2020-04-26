import {getAllowedCards} from '../../util/cards.js';

export default function (game, playerId) {
  const {currentTrick, players} = game;
  const {hand} = players[playerId];

  console.log(currentTrick, hand);
  const allowedCards = getAllowedCards(currentTrick, hand);

  // play randomly from the allowed cards
  const cardIndex = Math.floor(Math.random() * allowedCards.length);

  return allowedCards[cardIndex];
}
