import React from 'react';
import Card from './Card';
import './Deck.scss';

export default props => {
  const {onCardClick, cards, display} = props;

  return (
    <div className={`deck deck-${display}`}>
      {cards.map((card, idx) => {
        return <Card key={card.value || card || idx} card={card} onCardClick={onCardClick} />;
      })}
    </div>
  );
};
