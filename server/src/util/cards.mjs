import {
  tarotDeck,
  chienSizes,
  suits,
  suitsAndTrumps
} from '../constants';

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

    return sortCards(deck.slice(start, end));
  });

  return {hands, chien};
}

export function sortCards (hand, suitOrder = suitsAndTrumps, order = 'asc') {
  const orderFactor = (order === 'asc' && 1) || - 1;

  return hand.sort((a, b) => {
    const cardA = a.card || a;
    const cardB = b.card || b;

    //excuse at the end
    if (cardA === 'trumps-00') {
      return 1;
    }
    if (cardB === 'trumps-00') {
      return - 1;
    }

    //sort suits
    const suitA = suitOrder.indexOf(cardA.split('-')[0]);
    const suitB = suitOrder.indexOf(cardB.split('-')[0]);

    if (suitA > suitB) {
      return 1;
    }
    if (suitA < suitB) {
      return - 1;
    }

    //sort in suit
    const valueA = cardA.split('-')[1];
    const valueB = cardB.split('-')[1];

    if (valueA > valueB) {
      return 1 * orderFactor;
    }
    if (valueA < valueB) {
      return - 1 * orderFactor;
    }

    return 0;
  });
}

export function getAllowedCards (trick = [], hand) {
  if (trick.length === 0) {
    return hand;
  }

  const demandedSuit = trick[0].card.split('-')[0];

  //if player has demanded suit, only these are allowed
  const demandedSuitInHand = hand.filter(card => {
    return card.split('-')[0] === demandedSuit;
  });

  if (demandedSuitInHand.length) {
    return demandedSuitInHand;
  }

  //if player doesnt have demanded suit, only trumps are allowed
  const trumpsInHand = hand.filter(card => card.split('-')[0] === 'trumps');

  if (trumpsInHand.length) {
    //trumps allowed must be above the last trump card played in the trick
    const playedTrumps = trick
      .map(play => play.card)
      .filter(card => card.split('-')[0] === 'trumps');

    if (playedTrumps.length) {
      const lastPlayedTrump = playedTrumps[playedTrumps.length - 1];
      const lastPlayedTrumpValue = lastPlayedTrump.split('-')[1];
      const higherTrumps = trumpsInHand.filter(
        card => card.split('-')[1] > lastPlayedTrumpValue
      );

      return (higherTrumps.length && higherTrumps) || trumpsInHand;
    }

    //if player doesnt have a trump card higher than the last played, all trumps are allowed
    return trumpsInHand;
  }

  //if player has none of the demanded suit and no trumps, they can play anything
  return hand;
}

export function getTrickWinner (trick) {
  const demandedSuit = trick[0].card.split('-')[0];

  const suitOrder = [
    'trumps',
    demandedSuit,
    ...suits.slice(0, suits.indexOf(demandedSuit)),
    ...suits.slice(suits.indexOf(demandedSuit) + 1)
  ];

  const orderedCards = sortCards(trick, suitOrder, 'desc');

  return orderedCards[0].player;
}
