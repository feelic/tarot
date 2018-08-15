export function getNextPlayer (playerOrder, currentPlayer) {
  const nextTurn = playerOrder.indexOf(currentPlayer) + 1;
  const nextPlayer = playerOrder[nextTurn % playerOrder.length];

  return nextPlayer;
}
