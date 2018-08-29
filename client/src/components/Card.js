import React from 'react';
import './Card.css';
import '../assets/card-sprite.css';

export default props => {
  const {onCardClick, card} = props;
  const cardClass = (card && `icon-${card}`) || 'card-turned';

  return (
    <div onClick={() => onCardClick && onCardClick(card)} className={`card ${cardClass}`} />
  );
};
