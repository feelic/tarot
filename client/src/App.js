import React, {Component} from 'react';
import socketIOClient from 'socket.io-client';

import Lobby from './components/Lobby/';
import Room from './components/Room/';

import prepareState from './util/prepare-state';
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
      const appState = prepareState(payload);

      console.log(appState);

      this.setState(appState);
    });
  }

  componentWillMount () {
    //test settings to join and run a game right away
    this.socket.emit('join-room', {
      room: 'game-room-a',
      username: 'bobby',
      id: 'bobby',
      playerId: '1234'
    });
    this.send({type: 'ADD_BOT'});
    this.send({type: 'ADD_BOT'});
    this.send({type: 'ADD_BOT'});
    this.send({type: 'CHOOSE_GAME', game: 'four-player-tarot'});
    this.send({type: 'START_GAME'});
  }

  // method for emitting a socket.io event
  send (payload) {
    const {currentPlayer} = this.state;

    this.socket.emit('player-action', {...payload, currentPlayer});
  }

  render () {
    const boundActions = bindActionCreators(appActions, this.send.bind(this));
    const leaveRoom = () => {
      boundActions.leaveRoom();
      this.setState({room: null});
    };
    const actions = {
      ...boundActions,
      leaveRoom
    };

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
          <pre>{JSON.stringify(serverError, null, 2)}</pre>
        </div>
      }
      {children}
    </div>
  );
}
