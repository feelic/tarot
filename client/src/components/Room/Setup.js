import React, {Component} from 'react';

export default class Room extends Component {
  constructor () {
    super();
    this.state = {};
  }

  render () {
    const {actions, room, players, playerGameNumber} = this.props;
    const playerIds = Object.values(players);

    return (
      <div>
        <h1>{room}</h1>
        <ul>
          {playerIds.map(player => {
            return <li key={player.id}>{player.username}</li>;
          })}
        </ul>
        <p>Waiting for {playerGameNumber - playerIds.length} more player(s) to join</p>
        <button onClick={actions.addBot}>add a bot</button>
        <button onClick={actions.startGame}>start game</button>
      </div>
    );
  }
}
