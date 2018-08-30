import React from 'react';
import './Card.css';
import '../assets/card-sprite.css';

export default props => {
  const {onCardClick, card, disabled, tooltip} = props;
  const cardClass = (card && `icon-${card}`) || 'card-turned';
  const hoverableClass = card && ! disabled && 'card-hoverable';
  const tooltipAttribute = {};

  if (tooltip) {
    tooltipAttribute.title = tooltip;
  }

  return (
    <div
      onClick={() => onCardClick && ! disabled && onCardClick(card)}
      className={`card ${cardClass} ${hoverableClass}`}
      {...tooltipAttribute}
    >
      {disabled && <div className="card-disable-overlay" />}
    </div>
  );
};
