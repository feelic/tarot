import React from 'react';
export default props => {
  const {
    actions,
    players,
    winner,
    winThreshold,
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
        They did {totalRoundScore}, with a difference of {pointResult}
      </p>
      <p>
        The winner is/are{' '}
        {winner
          .map(playerId => {
            return players[playerId].username;
          })
          .join(', ')}
      </p>
      <button onCLick={actions.startGame}>Next round</button>
    </div>
  );
};
