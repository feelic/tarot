import React from 'react';
import {bidOptions} from '../../constants';

export default props => {
  const {actions, currentPlayer, players, bidSpeaker} = props;
  const title
    = (bidSpeaker === currentPlayer && 'Your turn to speak')
    || `${players[bidSpeaker].username}'s turn to speak`;

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
  );
};
