import React from 'react';
import '../assets/card-sprite.css';
import './Deck.css';

export default props => {
  const { cards } = props;

  return (
    <div className="deck">
      {cards.map(card => {
        return <div className={`card icon-${card}`} key={card} />;
      })}
    </div>
  );
};
