import React, {Component} from 'react';
import styles from './Setup.module.scss';
import Button from '../Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

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
                  <div
                    className={[styles.playerSlot, styles.emptyPlayerSlot].join(
                      ' '
                    )}
                    key={idx}
                  >
                    waiting for player or{' '}
                    <Button onClick={actions.addBot}>add a bot</Button>
                  </div>
                );
              }
              return (
                <div className={styles.playerSlot} key={player.id}>
                  {player.username}{' '}
                  {! player.connected && <b>connection issues</b>}
                  {player.bot
                    && <Button
                      type="secondary"
                      onClick={() => actions.removeBot(player.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} /> remove bot
                    </Button>
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
                  && <Button onClick={() => actions.removeBot(player.id)}>
                    <FontAwesomeIcon icon={faTrash} /> remove bot
                  </Button>
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
