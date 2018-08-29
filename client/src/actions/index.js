import {MAKE_CHIEN, PLACE_BID, START_GAME} from '../constants/action-types';

export function placeBid (bid) {
  return {type: PLACE_BID, bid};
}
export function startGame () {
  return {type: START_GAME};
}
export function makeChien (chien, hand) {
  return {type: MAKE_CHIEN, chien, hand};
}
