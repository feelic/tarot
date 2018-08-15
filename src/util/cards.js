import {tarotDeck, chienSizes} from '../constants';

export function dealCards (nbPlayers = 4) {
  //shuffle the deck
  const shuffledDeck = tarotDeck
    .map(a => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map(a => a[1]);
  const chienSize = chienSizes[nbPlayers];
  const chien = shuffledDeck.slice(0, chienSize);
  const deck = shuffledDeck.slice(chienSize);
  const handSize = deck.length / nbPlayers;
  const hands = new Array(nbPlayers).fill(0).map((hand, idx) => {
    const start = idx * handSize;
    const end = start + handSize;

    return sortHand(deck.slice(start, end));
  });

  return {hands, chien};
}

export function sortHand (hand) {
  const suitOrder = ['clubs', 'diamonds', 'spades', 'hearts', 'trumps'];

  return hand.sort((a, b) => {
    //excuse at the end
    if (a === 'trumps-00') {
      return 1;
    }
    if (b === 'trumps-00') {
      return - 1;
    }

    //sort suits
    const suitA = suitOrder.indexOf(a.split('-')[0]);
    const suitB = suitOrder.indexOf(b.split('-')[0]);

    if (suitA > suitB) {
      return 1;
    }
    if (suitA < suitB) {
      return - 1;
    }

    //sort in suit
    const valueA = a.split('-')[1];
    const valueB = b.split('-')[1];

    if (valueA > valueB) {
      return 1;
    }
    if (valueA < valueB) {
      return - 1;
    }

    return 0;
  });
}
