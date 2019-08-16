export default function (hand, chien) {
  const allCards = [...hand, ...chien];
  const trumps = allCards.filter(card => card.match('trumps'));
  const regulars = allCards
    .filter(card => ! card.match('trumps'))
    .sort((a, b) => {
      const valueA = a.split('-')[1];
      const valueB = b.split('-')[1];

      if (valueA < valueB) {
        return - 1;
      }
      if (valueA > valueB) {
        return 1;
      }
      return 0;
    });
  const updatedHand = [...trumps, ...regulars.slice(chien.length)];
  const discarded = regulars.slice(0, chien.length);

  return {
    updatedHand,
    discarded
  };
}
