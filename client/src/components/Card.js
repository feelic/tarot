import React from 'react';
import './Card.css';
import '../assets/card-sprite.css';

export default props => {
  const {card} = props;
  const cardClass = `icon-${card}`;

  return <div className={`card ${cardClass}`} />;
};
