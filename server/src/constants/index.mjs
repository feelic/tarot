export const suits = ['clubs', 'diamonds', 'spades', 'hearts'];
export const suitsAndTrumps = [...suits, 'trumps'];
export const bouts = ['trumps-01', 'trumps-21', 'trumps-00'];
export const chienSizes = {
  '3': 6,
  '4': 6,
  '5': 3
};
export const winThresholdByBoutsCount = [56, 51, 41, 36];

export const tarotDeck = buildDeck();

export function buildDeck () {
  return [
    ...buildSuit('clubs', 1, 14),
    ...buildSuit('diamonds', 1, 14),
    ...buildSuit('hearts', 1, 14),
    ...buildSuit('spades', 1, 14),
    ...buildSuit('trumps', 0, 21)
  ];
}
export function buildSuit (ensign, from, to) {
  const suit = [];

  for (let i = from; i <= to; i += 1) {
    suit.push(`${ensign}-${i.toString().padStart(2, '0')}`);
  }

  return suit;
}
export const bidOptions = {
  pass: {
    multiplier: 0
  },
  petite: {
    multiplier: 1
  },
  garde: {
    multiplier: 2
  },
  gardeSans: {
    multiplier: 4
  },
  gardeContre: {
    multiplier: 6
  }
};
export const bidRanking = Object.keys(bidOptions);
export const gamePhases = {
  ROOM_SETUP: 'ROOM_SETUP',
  BIDDING: 'BIDDING',
  CHIEN_REVEAL: 'CHIEN_REVEAL',
  TRICK: 'TRICK',
  ROUND_SCORES: 'ROUND_SCORES',
  FAILED_BIDDING: 'FAILED_BIDDING'
};
