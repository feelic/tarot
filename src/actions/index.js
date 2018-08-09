import {tarotDeck, chienSizes} from '../constants';
import * as actionTypes from '../constants/action-types';

export function deal (players = 4) {
  //shuffle the deck
  const shuffledDeck = tarotDeck
    .map(a => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map(a => a[1]);
  const chienSize = chienSizes[players];
  const chien = shuffledDeck.slice(0, chienSize);
  const deck = shuffledDeck.slice(chienSize);
  const handSize = deck.length / players;
  const playerHands = new Array(players).fill(0).map((hand, idx) => {
    const start = idx * handSize;
    const end = start + handSize;

    return sortHand(deck.slice(start, end));
  });

  return {type: actionTypes.DEAL, chien, playerHands};
}

export function sortHand (hand) {
  const suitOrder = ['clubs', 'diamonds', 'spades', 'hearts', 'trumps'];

  return hand.sort((a, b) => {
    //excuse at the end
    if (a === 'trumps-00') return 1;
    if (b === 'trumps-00') return -1;

    //sort suits
    const suitA = suitOrder.indexOf(a.split('-')[0]);
    const suitB = suitOrder.indexOf(b.split('-')[0]);

    if (suitA > suitB) return 1;
    if (suitA < suitB) return -1;

    //sort in suit
    const valueA = a.split('-')[1];
    const valueB = b.split('-')[1];

    if (valueA > valueB) return 1;
    if (valueA < valueB) return -1;

    return 0;
  });
}
