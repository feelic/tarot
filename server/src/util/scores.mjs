import {
  bouts,
  winThresholdByBoutsCount,
  bidOptions
} from '../constants';

export function getRoundScores (state) {
  const {players, bidTaker, bid} = state;
  const tricks = players[bidTaker].tricks;
  const boutsCounts = countBouts(tricks);
  const winThreshold = winThresholdByBoutsCount[boutsCounts];
  const totalRoundScore = countScore(tricks);
  const difference = totalRoundScore - winThreshold;
  const win = difference > 0;
  const winner
    = (win && [bidTaker])
    || Object.keys(players).filter(player => player !== bidTaker);
  const pointResult = difference * bidOptions[bid].multiplier;
  const playerScoreUpdates = Object.keys(players).reduce((prev, playerId) => {
    return {
      ...prev,
      [playerId]: (winner.includes(playerId) && pointResult) || pointResult * - 1
    };
  }, {});

  return {
    details: {
      boutsCounts,
      winThreshold,
      totalRoundScore,
      difference,
      pointResult,
      winner
    },
    scores: playerScoreUpdates
  };
}

export function countBouts (tricks) {
  return bouts.reduce((total, bout) => {
    return total + ~ ~ tricks.includes(bout);
  }, 0);
}

export function countScore (tricks) {
  return tricks.reduce((total, card) => {
    const isBout = bouts.includes(card);
    const cardSuit = card.split('-')[0];
    const cardValue = card.split('-')[1];
    const isTrump = cardSuit === 'trumps';
    const pointValue
      = (isTrump && 0.5) || (cardValue < 11 && 0.5) || cardValue - 10 + 0.5;
    const points = (isBout && 4.5) || pointValue;

    return total + points;
  }, 0);
}