import React, {Component, Fragment} from 'react';
import styles from './PlayerSlot.module.scss';
import Button from '../../Button';
import Select from '../../Select';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import botLevels from '../../../constants/bot-levels';

export default class PlayerSlot extends Component {
  render () {
    const {player, actions} = this.props;

    if (! player) {
      return (
        <div className={[styles.playerSlot, styles.emptyPlayerSlot].join(' ')}>
          waiting for player or{' '}
          <Button onClick={actions.addBot}>add a bot</Button>
        </div>
      );
    }
    return (
      <div className={styles.playerSlot}>
        <div>
          <span className={styles.playerName}>{player.username}</span>
        </div>
        <div className={styles.playerInfo}>
          {! player.connected
            && <div>
              <b>connection issues</b>
            </div>
          }
          {! player.bot && <div>human</div>}
          {player.bot
            && <Fragment>
              <div>
                <label>level:</label>
                <Select type="primary" value={player.botLevel} onChange={(e) => actions.setBotLevel(player.id, e.target.value)}>
                  {Object.values(botLevels).map(level => {
                    return (
                      <option key={level.id} value={level.id}>
                        {level.label}
                      </option>
                    );
                  })}
                </Select>
              </div>
              <div>
                <Button onClick={() => actions.removeBot(player.id)}>
                  <FontAwesomeIcon icon={faTrash} /> remove bot
                </Button>
              </div>
            </Fragment>
          }
        </div>
      </div>
    );
  }
}
