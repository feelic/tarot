import casual from './casual.js';
import idiot from './idiot.js';

const playCard = {
  casual,
  idiot
};

export default function (game, playerId) {
  const {players} = game;
  const {botLevel = 'casual'} = players[playerId];

  return playCard[botLevel](game, playerId);
}
