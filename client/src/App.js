import React, {Component} from 'react';
import socketIOClient from 'socket.io-client';

import BiddingPanel from './components/BiddingPanel';
import ChienRevealPanel from './components/ChienRevealPanel';
import Card from './components/Card';

import * as appActions from './actions';
import bindActionCreators from './actions/bind-action-creators';

// Making the App component
class App extends Component {
  constructor () {
    super();
    this.state = {
      endpoint: 'http://localhost:4001'
    };

    this.socket = socketIOClient(this.state.endpoint);

    this.socket.on('server-event', payload => {
      console.log(payload);
      this.setState(payload);
    });
  }

  componentWillMount () {
    this.handleConnect('game-room-a', 'bobby');
  }

  // method for emitting a socket.io event
  send (payload) {
    const {currentPlayer} = this.state;

    this.socket.emit('player-action', {...payload, currentPlayer});
  }

  handleConnect (room, username) {
    this.socket.emit('join-room', {room, username});
  }

  // render method that renders in code if the state is updated
  render () {
    const actions = bindActionCreators(appActions, this.send.bind(this));

    if (! this.state.room) {
      return (
        <div>
          <label>Name</label>
          <input
            type="text"
            onChange={e => this.setState({usernameInput: e.target.value})}
          />
          <label>Room</label>
          <input
            type="text"
            onChange={e => this.setState({roomInput: e.target.value})}
          />
          <button onClick={() => this.handleConnect(this.state.roomInput, this.state.usernameInput)}>Connect</button>
        </div>
      );
    }

    const {gamePhase, room, players, currentPlayer} = this.state;

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
          && <ChienRevealPanel {...this.state} actions={actions} />
        }
        <p>{players[currentPlayer].hand.map(card => <Card key={card} card={card} />)}</p>
      </div>
    );
  }
}

export default App;
