import {getAllowedCards} from '../util/cards.js';

export default function (trick, hand) {
  const allowedCards = getAllowedCards(trick, hand);

  // Very dumb algorithm, simply play the highest allowed Card
  return allowedCards[allowedCards.length - 1];
}
