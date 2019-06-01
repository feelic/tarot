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
    this.socket.emit('join-room', {
      room: 'game-room-a',
      username: 'bobby',
      id: 'bobby'
    });
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
        <GameContainer {...this.state}>
          <Lobby connect={payload => this.socket.emit('join-room', payload)} />
        </GameContainer>
      );
    }

    return (
      <GameContainer {...this.state}>
        <Room {...this.state} actions={actions} />
      </GameContainer>
    );
  }
}

export default App;

export function GameContainer (props) {
  const {children, serverError} = props;

  return (
    <div>
      {serverError
        && <div>
          <h1>The server encountered an error</h1>
          <p>{serverError}</p>{' '}
        </div>
      }
      {children}
    </div>
  );
}
