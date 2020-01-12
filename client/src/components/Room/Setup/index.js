import React, {Component} from 'react';
import Button from '../../Button';
import PlayerSlot from './PlayerSlot';

export default class Room extends Component {
  constructor () {
    super();
    this.state = {};
  }

  render () {
    const {actions, room, players, playerSlots, selectedGame} = this.props;
    const playersArray = Object.values(players);

    return (
      <div>
        <h1>Game room: {room}</h1>
        {selectedGame
          && <React.Fragment>
            <h2>Players</h2>
            {new Array(playerSlots).fill('').map((value, idx) => {
              const player = playersArray[idx];

              return <PlayerSlot key={idx} player={player} actions={actions} />;
            })}
          </React.Fragment>
        }
        <ul>
          {playersArray.slice(playerSlots).map(player => {
            return (
              <li key={player.id}>
                {player.username}{' '}
                {! player.connected && <b>connection issues</b>}
              </li>
            );
          })}
        </ul>
        {selectedGame
          && <React.Fragment>
            <p>
              Waiting for {playerSlots - playersArray.length} more player(s) to
              join
            </p>

            <Button onClick={actions.startGame}>start game</Button>
          </React.Fragment>
        }
        {! selectedGame
          && <React.Fragment>
            <p>Waiting for more player(s) to join</p>
            <Button onClick={() => actions.chooseGame('four-player-tarot')}>
              Play 4 player Tarot
            </Button>
          </React.Fragment>
        }

        <Button onClick={actions.leaveRoom}>leave room</Button>
      </div>
    );
  }
}
