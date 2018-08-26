import React from 'react';
import Card from './Card';

export default props => {
  const {actions, chien, bidTaker, currentPlayer, players} = props;

  return (
    <div>
      <h2>
        {players[bidTaker].username} takes the bid with {players[bidTaker].bid}
      </h2>

      {chien.map(card => {
        return <Card key={card} card={card} />;
      })}
    </div>
  );
};
