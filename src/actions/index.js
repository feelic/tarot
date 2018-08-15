import {dealCards} from '../util/cards';
import {INIT_GAME, DEAL, PLAY_CARD} from '../constants/action-types';
import playerNames from '../constants/player-names';

export function initialize (nbPlayers = 4) {
  return {
    type: INIT_GAME,
    players: ['You', ...playerNames.slice(0, nbPlayers - 1)]
  };
}

export function deal (nbPlayers = 4) {
  const {chien, hands} = dealCards(nbPlayers);

  return {type: DEAL, chien, hands};
}

export function playCard (player, card) {
  return {
    type: PLAY_CARD,
    player,
    card
  };
}
