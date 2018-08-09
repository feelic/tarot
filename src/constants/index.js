// rules taken from https://www.pagat.com/tarot/frtarot.html

export const tarotDeck = buildDeck();

export function buildDeck () {
  return [
    ...buildSuit('clubs', 1, 14),
    ...buildSuit('diamonds', 1, 14),
    ...buildSuit('hearts', 1, 14),
    ...buildSuit('spades', 1, 14),
    ...buildSuit('trumps', 0, 21)
  ];
};
export function buildSuit (ensign, from, to) {
  const suit = [];

  for (let i = from; i <= to; i += 1) {
    suit.push(`${ensign}-${i.toString().padStart(2, '0')}`);
  }

  return suit;
}

export const chienSizes = {
  '3': 6,
  '4': 6,
  '5': 3
};
