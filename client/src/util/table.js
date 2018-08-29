const fourPlayerSlots = ['bottom', 'right', 'top', 'left'];
const fivePlayerSlots = ['bottom', 'right', 'top', 'top', 'left'];

export function definePlayerPositions (playerOrder, currentPlayer) {
  const currentPlayerIndex = playerOrder.indexOf(currentPlayer);
  const playerDisplayOrder = [
    ...playerOrder.slice(currentPlayerIndex),
    ...playerOrder.slice(0, currentPlayerIndex)
  ];
  const playerSlots
    = (playerOrder.length === 5 && fivePlayerSlots) || fourPlayerSlots;

  return playerDisplayOrder.reduce((prev, curr, idx) => {
    return {...prev, [curr]: playerSlots[idx]};
  }, {});
}
