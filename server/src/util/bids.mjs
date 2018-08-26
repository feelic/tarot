import {bidOptions} from '../constants';

export function getBidTaker (players = {}, playerOrder) {
  const playerBids = Object.values(players).map(player => player.bid);

  if (playerBids.includes(false)) {
    return null;
  }

  const bidRanking = Object.keys(bidOptions);
  const winner = Object.values(players).reduce((winner, player) => {
    const winningBid = bidRanking.indexOf(winner.bid);
    const playerBid = bidRanking.indexOf(player.bid);

    if (winningBid < playerBid) {
      return player;
    }

    return winner;
  }, playerOrder[0]);

  if (bidRanking.indexOf(winner.bid) === 0) {
    return 'nobody';
  }

  return winner.id;
}
