import React, {Component} from 'react';
import Button from '../Button';
import styles from './index.module.scss';

export default class Lobby extends Component {
  constructor () {
    super();
    this.state = {};
  }

  handleConnect (room, username, playerId) {
    this.socket.emit('join-room', {room, username, playerId});
  }

  render () {
    const {connect} = this.props;
    const {room, username, playerId} = this.state;

    return (
      <div>
        <h1>French Tarot</h1>
        <div className={styles.form}>
          <p>
            <label>User id</label>
            <input
              type="text"
              onChange={e => this.setState({playerId: e.target.value})}
            />
          </p>
          <p>
            <label>Name</label>
            <input
              type="text"
              onChange={e => this.setState({username: e.target.value})}
            />
          </p>
          <p>
            <label>Room</label>
            <input
              type="text"
              onChange={e => this.setState({room: e.target.value})}
            />
          </p>
          <div className={styles.connectButton}>
            <Button onClick={() => connect({room, username, playerId})}>
              Connect
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
