import React, {Component} from 'react';

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

              if (! player) {
                return (
                  <div>
                    waiting for player or{' '}
                    <button onClick={actions.addBot}>add a bot</button>
                  </div>
                );
              }
              return (
                <div>
                  {player.username}{' '}
                  {! player.connected && <b>connection issues</b>}
                  {player.bot
                    && <button onClick={() => actions.removeBot(player.id)}>
                      (remove bot)
                    </button>
                  }
                </div>
              );
            })}
          </React.Fragment>
        }
        <ul>
          {playersArray.slice(playerSlots).map(player => {
            return (
              <li key={player.id}>
                {player.username}{' '}
                {! player.connected && <b>connection issues</b>}
                {player.bot
                  && <button onClick={() => actions.removeBot(player.id)}>
                    (remove bot)
                  </button>
                }
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

            <button onClick={actions.startGame}>start game</button>
          </React.Fragment>
        }
        {! selectedGame
          && <React.Fragment>
            <p>Waiting for more player(s) to join</p>
            <button onClick={() => actions.chooseGame('four-player-tarot')}>
              Play 4 player Tarot
            </button>
          </React.Fragment>
        }

        <button onClick={actions.leaveRoom}>leave room</button>
      </div>
    );
  }
}
