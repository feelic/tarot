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

  static getDerivedStateFromProps (props, state) {
    if (props.gamePhase === gamePhases.CHIEN_REVEAL && ! state.hand) {
      return {
        hand: props.hand,
        chien: props.chien
      };
    }
    return null;
  }

  render () {
    const {
      actions,
      gamePhase,
      room,
      players,
      playerGameNumber,
      currentPlayer,
      playerOrder,
      bidTaker
    } = this.props;

    console.log(this.state);
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

    const hand
      = (gamePhase === gamePhases.CHIEN_REVEAL && this.state.hand) || this.props.hand;
    const chien
      = (gamePhase === gamePhases.CHIEN_REVEAL && this.state.chien)
      || this.props.chien;
    const playerPositions = definePlayerPositions(playerOrder, currentPlayer);
    const cardAction
      = gamePhase === gamePhases.CHIEN_REVEAL && bidTaker === currentPlayer
      && (card => this.moveCardFromHandToChien(card));

    return (
      <div className="table">
        {Object.keys(players).map(playerId => {
          return (
            <PlayerSlot
              key={playerId}
              currentPlayer={currentPlayer}
              playerId={playerId}
              cardAction={cardAction}
              playerPositions={playerPositions}
              hand={hand}
              chien={chien}
              players={players}
            />
          );
        })}
        <div className="table-center">
          <h1>{gamePhase}</h1>
          {gamePhase === gamePhases.BIDDING && <BiddingPanel {...this.props} />}
          {gamePhase === gamePhases.CHIEN_REVEAL
            && <ChienRevealPanel
              {...this.props}
              chien={chien}
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
