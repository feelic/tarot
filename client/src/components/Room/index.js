import React, {Component} from 'react';

import BiddingPanel from './BiddingPanel';
import ChienRevealPanel from './ChienRevealPanel';
import Setup from './Setup';
import PlayerSlot from './PlayerSlot';

import {gamePhases} from '../../constants';
import {sortCards} from '../../util/cards';
import {definePlayerPositions} from '../../util/table';

import './index.css';

export default class Room extends Component {
  constructor () {
    super();
    this.state = {};
  }

  render () {
    const {
      actions,
      gamePhase,
      room,
      players,
      playerGameNumber,
      currentPlayer,
      playerOrder
    } = this.props;

    if (gamePhase === 'ROOM_SETUP') {
      return (
        <Setup
          actions={actions}
          players={players}
          room={room}
          playerGameNumber={playerGameNumber}
        />
      );
    }

    const playerPositions = definePlayerPositions(playerOrder, currentPlayer);
    const cardAction
      = gamePhase === gamePhases.CHIEN_REVEAL
      && (card => this.moveCardFromHandToChien(card));

    return (
      <div className="table">
        {Object.keys(players).map(playerId => {
          return (
            <PlayerSlot
              key={playerId}
              {...this.props}
              playerId={playerId}
              cardAction={cardAction}
              playerPositions={playerPositions}
            />
          );
        })}
        <div className="table-center">
          <h1>{gamePhase}</h1>
          {gamePhase === gamePhases.BIDDING && <BiddingPanel {...this.props} />}
          {gamePhase === gamePhases.CHIEN_REVEAL
            && <ChienRevealPanel
              {...this.props}
              moveCardFromChienToHand={this.moveCardFromChienToHand.bind(this)}
            />
          }
        </div>
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
