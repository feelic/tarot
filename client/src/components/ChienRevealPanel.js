import React from 'react';
import Deck from './Deck';

export default props => {
  const {actions, chien, bidTaker, currentPlayer, players} = props;

  return (
    <div>
      <h2>
        {players[bidTaker].username} takes the bid with {players[bidTaker].bid}
      </h2>

      <Deck display="spread" cards={chien} />
    </div>
  );
};
