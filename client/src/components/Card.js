import React from 'react';
import './Card.css';
import '../assets/card-sprite.css';

export default props => {
  const {onCardClick, card} = props;
  const cardClass = `icon-${card}`;

  return <div onClick={() => onCardClick(card)} className={`card ${cardClass}`} />;
};
