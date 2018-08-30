import React from 'react';

import Deck from '../Deck';

export default props => {
  const {
    currentTrick
  } = props;

  return <Deck cards={currentTrick.map(play => play.card)} />;
};
