import React from 'react';
import Deck from '../Deck';

import {getAllowedCards} from '../../util/cards';

export default props => {
  const {cardAction, playerId, bidTaker, currentPlayer, playerPositions, player} = props;

  const isCurrentPlayer = playerId === currentPlayer;
  const playerPosition = playerPositions[playerId];
  const displayModes = {
    top: 'compact',
    left: 'vertical',
    right: 'vertical',
    bottom: 'hand'
  };
  const displayMode = displayModes[playerPosition];
  const cards = getCards(props);

  return (
    <div className={`player-slot player-slot-${playerPosition}`}>
      <h2>
        {player.username} {bidTaker === playerId && '(T)'}
      </h2>
      {! player.connected && <b>connection issues</b>}
      <Deck
        display={displayMode}
        cards={cards}
        onCardClick={isCurrentPlayer && cardAction}
      />
    </div>
  );
};

function getCards (props) {
  const {
    playerId,
    currentPlayer,
    player,
    currentTrick,
    playerTurn,
    hand = []
  } = props;

  if (playerId !== currentPlayer) {
    return new Array(player.hand.length).fill('');
  }

  const isPlaying = playerTurn === currentPlayer;
  const allowedCards = isPlaying && getAllowedCards(currentTrick, hand);

  return hand.map(card => {
    return {
      value: card,
      disabled: isPlaying && ! allowedCards.includes(card)
    };
  });
}
