import React from 'react';
import Deck from '../Deck';

export default props => {
  const {
    chien,
    bidTaker,
    currentPlayer,
    players,
    moveCardFromChienToHand,
    confirmChien
  } = props;

  if (bidTaker !== currentPlayer) {
    return (
      <React.Fragment>
        <h1>
          {players[bidTaker].username} takes the bid with{' '}
          {players[bidTaker].bid}
        </h1>
        <Deck display="spread" cards={chien} />
        <p>Please wait while {players[bidTaker].username} makes their chien...</p>
      </React.Fragment>
    );
  }

  const displayMode = (chien.length <= 6 && 'spread') || 'hand';

  return (
    <React.Fragment>
      <h1>You take the bid with {players[bidTaker].bid}</h1>
      <p>
        You can exchange cards from your hand and the chien. Cards in the chien
        will be added to your tricks, and count towards your score in this
        round.<br />
        The other players will not see the cards you place in your chien.
      </p>
      <div className="chien-cards">
        <Deck
          display={displayMode}
          cards={chien}
          onCardClick={moveCardFromChienToHand}
        />
        {chien.length === 6
          && <button
            onClick={confirmChien}
          >
            Confirm chien
          </button>
        }
      </div>
    </React.Fragment>
  );
};
