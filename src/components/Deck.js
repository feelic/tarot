import React from 'react';
import '../assets/card-sprite.css';
import './Deck.css';

export default props => {
  const {cards, turned} = props;
  const deckClass = turned && 'deck-back';

  return (
    <div className={`deck ${deckClass}`}>
      {cards.map(card => {
        const cardClass = (turned && 'turned') || `icon-${card}`;

        return <div className={`card ${cardClass}`} key={card} />;
      })}
    </div>
  );
};
