import React from 'react';
import Deck from './Deck';

export default props => {
  const {chien, bidTaker, currentPlayer, players} = props;

  if (bidTaker !== currentPlayer) {
    return (
      <div>
        <h2>
          {players[bidTaker].username} takes the bid with{' '}
          {players[bidTaker].bid}
        </h2>
        <Deck display="spread" cards={chien} />
        <p>Please wait while they make their chien...</p>
      </div>
    );
  }

  return (
    <div>
      <h2>You take the bid with {players[bidTaker].bid}</h2>
      <p>
        You can exchange cards from your hand and the chien. Cards in the chien
        will be added to your tricks, and count towards your score in this
        round.<br/>
        The other players will not see the cards you place in your chien.
      </p>
      <Deck display="spread" cards={chien} action />
      <button>Confirm chien</button>
    </div>
  );
};
