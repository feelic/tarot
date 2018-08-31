import React, {Component} from 'react';

import BiddingPanel from './BiddingPanel';
import ChienRevealPanel from './ChienRevealPanel';
import Setup from './Setup';
import PlayerSlot from './PlayerSlot';
import TrickPanel from './TrickPanel';

import {gamePhases} from '../../constants';
import {sortCards} from '../../util/cards';
import {definePlayerPositions} from '../../util/table';

import './index.css';

const {TRICK, CHIEN_REVEAL, BIDDING} = gamePhases;

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
      currentTrick,
      playerTurn
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

    const hand
      = (gamePhase === CHIEN_REVEAL && this.state.hand) || this.props.hand;
    const chien
      = (gamePhase === CHIEN_REVEAL && this.state.chien) || this.props.chien;
    const playerPositions = definePlayerPositions(playerOrder, currentPlayer);

    return (
      <div className="table">
        {Object.keys(players).map(playerId => {
          return (
            <PlayerSlot
              key={playerId}
              currentPlayer={currentPlayer}
              playerId={playerId}
              cardAction={this.handleCardClick.bind(this)}
              playerPositions={playerPositions}
              hand={hand}
              chien={chien}
              players={players}
              currentTrick={currentTrick}
              playerTurn={playerTurn}
            />
          );
        })}
        <div className="table-center">
          {gamePhase === BIDDING && <BiddingPanel {...this.props} />}
          {gamePhase === CHIEN_REVEAL
            && <ChienRevealPanel
              {...this.props}
              chien={chien}
              confirmChien={this.handleConfirmChien.bind(this)}
              moveCardFromChienToHand={this.moveCardFromChienToHand.bind(this)}
            />
          }
          {gamePhase === TRICK && <TrickPanel {...this.props} playerPositions={playerPositions}/>}
        </div>
      </div>
    );
  }

  handleCardClick (card) {
    const {
      actions,
      gamePhase,
      currentPlayer,
      bidTaker,
      playerTurn
    } = this.props;

    if (gamePhase === CHIEN_REVEAL && currentPlayer === bidTaker) {
      return this.moveCardFromHandToChien(card);
    }

    if (gamePhase === TRICK && currentPlayer === playerTurn) {
      return actions.playCard(card);
    }

    return null;
  }

  handleConfirmChien () {
    this.props.actions.makeChien(this.state.chien, this.state.hand);
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
