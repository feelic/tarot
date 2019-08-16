import {bidRanking} from '../constants/index.js';

export function getBidTaker (players = {}) {
  const playerBids = Object.values(players).map(player => player.bid);

  if (playerBids.includes(false)) {
    return null;
  }

  const winner = Object.values(players).reduce(compareBids, {bid: 'pass'});

  if (bidRanking.indexOf(winner.bid) === 0) {
    return 'nobody';
  }

  return winner.id;
}

export function compareBids (playerA, playerB) {
  const winningBid = bidRanking.indexOf(playerA.bid);
  const playerBid = bidRanking.indexOf(playerB.bid);

  if (winningBid < playerBid) {
    return playerB;
  }

  return playerA;
}

export function getAllowedBids (players) {
  const highestBid = Object.values(players).reduce(compareBids, {bid: 'pass'}).bid;
  const highestBidIdx = bidRanking.indexOf(highestBid);

  return ['pass', ...bidRanking.slice(highestBidIdx + 1)];
}
