import React from 'react';
import Card from './Card';
import './Deck.css';

export default props => {
  const {onCardClick, cards, display} = props;

  return (
    <div className={`deck deck-${display}`}>
      {cards.map(card => {
        return <Card key={card} card={card} onCardClick={onCardClick} />;
      })}
    </div>
  );
};
