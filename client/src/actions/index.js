import {PLACE_BID, START_GAME} from '../constants/action-types';

export function placeBid (bid) {
  return {type: PLACE_BID, bid};
}
export function startGame () {
  return {type: START_GAME};
}
