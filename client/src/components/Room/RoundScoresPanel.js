import React from 'react';
import Button from '../Button';

export default props => {
  const {
    actions,
    players,
    scores,
    bidTaker,
    bid
  } = props;
  const playerScores = scores.scores;
  const {
    winner,
    winThreshold,
    difference,
    boutsCounts,
    trickPoints
  } = scores.details;

  return (
    <div>
      <p>
        {players[bidTaker].username} took the bid with {bid}.
      </p>
      <p>
        With {boutsCounts} bouts they must do {winThreshold} points to win the
        round
      </p>
      <p>
        They did {trickPoints}, with a difference of {difference}
      </p>
      <p>
        {(winner.length > 1 && 'The winners are') || 'The winner is'}{' '}
        {winner
          .map(playerId => {
            return players[playerId].username;
          })
          .join(', ')}
      </p>
      <table>
        <thead>
          <tr>
            <td>Player</td>
            <td>This round</td>
            <td>Total</td>
          </tr>
        </thead>
        <tbody>
          {Object.values(players).map(player => {
            return (
              <tr key={player.id}>
                <td>{player.username}</td>
                <td>{playerScores[player.id]}</td>
                <td>{player.score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Button onClick={actions.startRound}>Next round</Button>
    </div>
  );
};
