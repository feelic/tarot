import React from 'react';
import './Card.css';
import '../assets/card-sprite.css';

export default props => {
  const {onCardClick, card, tooltip} = props;
  const {value, disabled, cardClass, hoverable} = normalizeCard(card);
  const hoverableClass = onCardClick && hoverable && 'card-hoverable';
  const tooltipAttribute = {};

  if (tooltip) {
    tooltipAttribute.title = tooltip;
  }

  return (
    <div
      onClick={() => onCardClick && ! disabled && onCardClick(value)}
      className={`card ${cardClass} ${hoverableClass}`}
      {...tooltipAttribute}
    >
      {disabled && <div className="card-disable-overlay" />}
    </div>
  );
};

export function normalizeCard (card) {
  if (typeof card === 'string') {
    const turned = card === '';

    return {
      value: card,
      disabled: false,
      cardClass: (turned && 'card-turned') || `icon-${card}`,
      hoverable: ! turned
    };
  }

  return {...card, cardClass: `icon-${card.value}`, hoverable: ! card.disabled};
}
