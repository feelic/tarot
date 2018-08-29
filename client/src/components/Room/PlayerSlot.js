import React from 'react';
import Deck from '../Deck';

export default props => {
  const {cardAction, playerId, currentPlayer, playerPositions, hand, players} = props;

  const isCurrentPlayer = playerId === currentPlayer;
  const playerPosition = playerPositions[playerId];
  const displayModes = {
    top: 'compact',
    left: 'vertical',
    right: 'vertical',
    bottom: 'hand'
  };
  const displayMode = displayModes[playerPosition];
  const playerHand = players[playerId].hand;
  const cards
    = (isCurrentPlayer && hand) || new Array(playerHand.length).fill('');

  return (
    <div className={`player-slot player-slot-${playerPosition}`}>
      <h2>{players[playerId].username}</h2>
      <Deck
        display={displayMode}
        cards={cards}
        onCardClick={isCurrentPlayer && cardAction}
      />
    </div>
  );
};
