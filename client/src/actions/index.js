import {
  MAKE_CHIEN,
  PLACE_BID,
  PLAY_CARD,
  START_GAME,
  ADD_BOT,
  LEAVE_ROOM,
  CHOOSE_GAME
} from '../constants/action-types';

export function placeBid (bid) {
  return {type: PLACE_BID, bid};
}
export function startGame () {
  return {type: START_GAME};
}
export function chooseGame (game) {
  return {type: CHOOSE_GAME, game};
}
export function makeChien (chien, hand) {
  return {type: MAKE_CHIEN, chien, hand};
}
export function playCard (card) {
  return {type: PLAY_CARD, card};
}
export function addBot () {
  return {type: ADD_BOT};
}
export function leaveRoom () {
  return {type: LEAVE_ROOM};
}
