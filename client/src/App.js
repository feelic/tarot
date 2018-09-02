import React, {Component} from 'react';
import socketIOClient from 'socket.io-client';

import Lobby from './components/Lobby';
import Room from './components/Room/';

import * as appActions from './actions';
import bindActionCreators from './actions/bind-action-creators';

class App extends Component {
  constructor () {
    super();
    this.state = {
      endpoint: 'http://localhost:4001'
    };

    this.socket = socketIOClient(this.state.endpoint);

    this.socket.on('server-event', payload => {
      console.log(payload);
      this.setState({
        ...payload,
        ...payload.players[payload.currentPlayer]
      });
    });
  }

  componentWillMount () {
    this.socket.emit('join-room', {room: 'game-room-a', username: 'bobby'});
    this.send({type: 'ADD_BOT'});
    this.send({type: 'ADD_BOT'});
    this.send({type: 'ADD_BOT'});
    this.send({type: 'START_GAME'});
  }

  // method for emitting a socket.io event
  send (payload) {
    const {currentPlayer} = this.state;

    this.socket.emit('player-action', {...payload, currentPlayer});
  }

  render () {
    const actions = bindActionCreators(appActions, this.send.bind(this));

    if (! this.state.room) {
      return (
        <Lobby connect={payload => this.socket.emit('join-room', payload)} />
      );
    }

    return <Room {...this.state} actions={actions} />;
  }
}

export default App;
