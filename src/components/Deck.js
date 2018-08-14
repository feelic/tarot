import React, {Component} from 'react';
import '../assets/card-sprite.css';
import './Deck.css';

export default class Deck extends Component {
  handleCardClick (card) {
    const {isPlayer, player, actions} = this.props;

    if (true || isPlayer) {
      return actions.playCard(player, card);
    }

    return null;
  }

  render () {
    const {cards, turned, tooltips = []} = this.props;
    const deckClass = (turned && 'deck-back') || null;

    return (
      <div className={`deck ${deckClass}`}>
        {cards.map((card, idx) => {
          const cardClass = (turned && 'turned') || `icon-${card}`;
          const tooltip = (! turned && (tooltips[idx] || card)) || null;

          return (
            <div
              onClick={() => this.handleCardClick(card)}
              className={`card ${cardClass}`}
              key={card}
              title={tooltip}
            />
          );
        })}
      </div>
    );
  }
}
