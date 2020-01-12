import {getAllowedCards} from '../util/cards.js';

export default function (trick, hand) {
  const allowedCards = getAllowedCards(trick, hand);

  // play randomly from the allowed cards
  // const cardIndex = Math.floor(Math.random() * allowedCards.length);

  // play highest allowed card
  const cardIndex = allowedCards.length - 1;

  return allowedCards[cardIndex];
}
