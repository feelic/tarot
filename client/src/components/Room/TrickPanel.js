import React from 'react';

import Card from '../Card';

import './TrickPanel.scss';

export default props => {
  const {
    currentPlayer,
    playerPositions,
    game
  } = props;
  const {
    trickWinner,
    currentTrick,
    players,
    playerTurn
  } = game;

  const trickWinnerText = getTrickWinnerText(
    trickWinner,
    currentPlayer,
    players,
    currentTrick
  );
  const playerTurnText = getPlayerTurnText(playerTurn, currentPlayer, players);
  const title = trickWinnerText + playerTurnText;

  return (
    <React.Fragment>
      <h1>{title}</h1>
      <div className="trick-panel">
        {currentTrick.map(play => {
          const position = playerPositions[play.player];

          return (
            <div key={play.card} className={`trick-panel-card trick-panel-card-${position}`}>
              <Card card={play.card} />
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

function getTrickWinnerText (trickWinner, currentPlayer, players) {
  if (! trickWinner) {
    return '';
  }

  if (trickWinner === currentPlayer) {
    return 'You win the trick ! ';
  }

  return `${players[trickWinner].username} wins the trick. `;
}
function getPlayerTurnText (playerTurn, currentPlayer, players) {
  if (! playerTurn) {
    return '';
  }

  if (playerTurn === currentPlayer) {
    return 'Your turn to play.';
  }

  return `${players[playerTurn].username}'s turn to play`;
}
