import React from 'react';
import {bidOptions} from '../../constants';
import styles from './BiddingPanel.module.scss';

const bidDescriptions = {
  pass: 'Let someone else take all the risks',
  petite: 'When you want to try but not risk too much',
  garde: 'Points are doubled, win or lose',
  gardeSans: 'Points are tripled, but the chien remains a mystery',
  gardeContre: 'Points are quadrupled, and the chien goes to the enemy'
};

export default props => {
  const {actions, currentPlayer, players, bidSpeaker, bidTaker} = props;

  const title = getPanelTitle(bidSpeaker, bidTaker, currentPlayer, players);
  const isSpeaker = bidSpeaker === currentPlayer;

  return (
    <React.Fragment>
      <h1>{title}</h1>
      <h2>Bids:</h2>
      {Object.values(players).map(player => {
        const displayName
          = (player.id === currentPlayer && 'You') || player.username;

        return (
          <div key={player.id}>
            {displayName}: {player.bid}
          </div>
        );
      })}
      {isSpeaker
        && <React.Fragment>
          <h2>Your Options</h2>
          {Object.keys(bidOptions).map(option => {
            return (
              <div key={option} className={styles.bidOption} onClick={() => actions.placeBid(option)}>
                <p>{bidDescriptions[option]}</p>
                <div className={styles.bidLabel}>{option}</div>
              </div>
            );
          })}
        </React.Fragment>
      }
    </React.Fragment>
  );
};

function getPanelTitle (bidSpeaker, bidTaker, currentPlayer, players) {
  if (bidTaker === currentPlayer) {
    return 'You take the bid !';
  }

  if (bidTaker === 'nobody') {
    return 'Nobody takes the bid, dealing again...';
  }

  if (bidTaker) {
    return `${players[bidTaker].username} takes the bid !`;
  }

  if (bidSpeaker === currentPlayer) {
    return 'Your turn to speak';
  }

  return `${players[bidSpeaker].username}'s turn to speak`;
}
