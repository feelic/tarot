import React from 'react';
import {bidOptions} from '../../constants';

export default props => {
  const {actions, bidSpeaker, currentPlayer, players} = props;

  return (
    <React.Fragment>
      <h2>{bidSpeaker === currentPlayer && 'Your turn'}</h2>
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
