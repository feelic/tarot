import React, {Component} from 'react';

export default class Lobby extends Component {
  constructor () {
    super();
    this.state = {};
  }

  handleConnect (room, username) {
    this.socket.emit('join-room', {room, username});
  }

  render () {
    const {connect} = this.props;
    const {room, username} = this.state;

    return (
      <div>
        <label>Name</label>
        <input
          type="text"
          onChange={e => this.setState({username: e.target.value})}
        />
        <label>Room</label>
        <input
          type="text"
          onChange={e => this.setState({room: e.target.value})}
        />
        <button
          onClick={() =>
            connect({room, username})
          }
        >
          Connect
        </button>
      </div>
    );
  }
}
