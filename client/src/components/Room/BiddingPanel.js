import React from 'react';
import {bidOptions} from '../../constants';

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
          <ul>
            {Object.keys(bidOptions).map(option => {
              return (
                <li key={option}>
                  <a onClick={() => actions.placeBid(option)}>{option}</a>
                </li>
              );
            })}
          </ul>
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
