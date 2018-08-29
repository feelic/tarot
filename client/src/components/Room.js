import React, {Component} from 'react';

import BiddingPanel from './BiddingPanel';
import ChienRevealPanel from './ChienRevealPanel';
import Deck from './Deck';

import {sortCards} from '../util/cards';

export default class Lobby extends Component {
  constructor () {
    super();
    this.state = {};
  }

  render () {
    const {actions, gamePhase, hand, room, players} = this.props;

    if (gamePhase === 'ROOM_SETUP') {
      return (
        <div>
          <h1>{room}</h1>
          <button onClick={actions.startGame}>start game</button>
          <ul>
            {Object.values(players).map(player => {
              return <li key={player.id}>{player.username}</li>;
            })}
          </ul>
        </div>
      );
    }

    return (
      <div>
        <h1>{gamePhase}</h1>
        {gamePhase === 'BIDDING'
          && <BiddingPanel {...this.state} actions={actions} />
        }
        {gamePhase === 'CHIEN_REVEAL'
          && <ChienRevealPanel
            {...this.state}
            actions={actions}
            moveCardFromChienToHand={this.moveCardFromChienToHand.bind(this)}
          />
        }
        <Deck
          display="hand"
          cards={hand}
          onCardClick={card => this.moveCardFromHandToChien(card)}
        />
      </div>
    );
  }

  moveCardFromChienToHand (card) {
    const playerHand = this.state.hand;
    const cardIndex = this.state.chien.indexOf(card);
    const hand = sortCards([...playerHand, card]);
    const chien = [
      ...this.state.chien.slice(0, cardIndex),
      ...this.state.chien.slice(cardIndex + 1)
    ];

    this.setState({
      hand,
      chien
    });
  }
  moveCardFromHandToChien (card) {
    const playerHand = this.state.hand;
    const cardIndex = playerHand.indexOf(card);
    const chien = [...this.state.chien, card];
    const hand = [
      ...playerHand.slice(0, cardIndex),
      ...playerHand.slice(cardIndex + 1)
    ];

    this.setState({
      hand,
      chien
    });
  }
}
