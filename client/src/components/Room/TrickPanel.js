import React from 'react';

import Deck from '../Deck';

export default props => {
  const {currentTrick, currentPlayer, playerTurn, players, trickWinner} = props;
  const trickWinnerText = getTrickWinnerText (trickWinner, currentPlayer, players, currentTrick);
  const playerTurnText = getPlayerTurnText (playerTurn, currentPlayer, players);
  const title = trickWinnerText + playerTurnText;

  return (
    <React.Fragment>
      <h1>{title}</h1>
      <Deck cards={currentTrick.map(play => play.card)} />
    </React.Fragment>
  );
};

function getTrickWinnerText (trickWinner, currentPlayer, players, currentTrick) {
  if (! trickWinner || currentTrick.length !== 0) {
    return '';
  }

  if (trickWinner === currentPlayer) {
    return 'You win the trick ! ';
  }

  return `${players[trickWinner].username} wins the trick. `;
}
function getPlayerTurnText (playerTurn, currentPlayer, players) {
  if (playerTurn === currentPlayer) {
    return 'Your turn to play.';
  }

  return `${players[playerTurn].username}'s turn to play`;
}
