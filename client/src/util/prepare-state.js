export default state => {
  const players
    = (state.game.players
      && Object.keys(state.game.players).reduce((prev, playerId) => {
        return {
          ...prev,
          [playerId]: {
            ...state.players[playerId],
            ...state.game.players[playerId]
          }
        };
      }, {}))
    || {};

  return {
    ...state,
    game: {
      ...state.game,
      players
    }
  };
};
