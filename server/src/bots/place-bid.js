import {bouts} from '../constants/index.js';
import {getAllowedBids} from '../util/bids.js';

export default function (players, hand) {
  const allowedBids = getAllowedBids(players);
  const handStrength = assessHandStrength(players, hand);

  if (handStrength > 3) {
    return allowedBids[1];
  }

  return allowedBids[0];
}

export function assessHandStrength (players, hand) {
  const playerNumber = Object.keys(players).length;

  const trumpsCount = hand.filter(card => card.match('trump')).length;
  const averageTrumps = Math.floor(21 / playerNumber);
  const trumpStrength = trumpsCount - averageTrumps;

  const highCardCount = hand.filter(card => card.split('-')[1] > 10).length;
  const averageHighCards = Math.floor((4 * 4 + 10) / playerNumber);
  const highCardStrength = highCardCount - averageHighCards;

  const boutCount = hand.filter(card => bouts.includes(card)).length;

  return boutCount * 2 + trumpStrength + Math.floor(highCardStrength / 2);
}
