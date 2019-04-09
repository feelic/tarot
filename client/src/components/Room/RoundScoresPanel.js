import React from 'react';
export default props => {
  const {
    actions,
    players,
    winner,
    winThreshold,
    difference,
    boutsCounts,
    totalRoundScore,
    bidTaker,
    bid,
    pointResult
  } = props;

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
        They did {totalRoundScore}, with a difference of {difference}
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
                <td>{0}</td>
                <td>{player.score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={actions.startGame}>Next round</button>
    </div>
  );
};
