/* global describe, it, expect */
import playCard from './play-card';

describe('playCard', () => {
  it('should play an allowed card', () => {
    const game = {
      gamePhase: 'TRICK',
      players: {
        '1234': {
          tricks: [],
          id: '1234'
        },
        Alberto: {
          tricks: [],
          id: 'Alberto'
        },
        Bernadette: {
          tricks: [],
          id: 'Bernadette'
        },
        Cuthbert: {
          hand: ['clubs-04', 'trumps-12'],
          tricks: [],
          id: 'Cuthbert'
        }
      },
      playerOrder: [],
      chien: [],
      roundOpener: '1234',
      currentTrick: [
        {card: 'clubs-05', player: '1234'},
        {card: 'clubs-03', player: 'Alberto'},
        {card: 'clubs-06', player: 'Bernadette'}
      ],
      playerTurn: 'Cuthbert',
      bidTaker: '1234'
    };
    const playedCard = playCard(game, 'Cuthbert');

    expect(playedCard).toBe('clubs-04');
  });
  it('should play a winning card', () => {
    const game = {
      gamePhase: 'TRICK',
      players: {
        '1234': {
          tricks: [],
          id: '1234'
        },
        Alberto: {
          tricks: [],
          id: 'Alberto'
        },
        Bernadette: {
          tricks: [],
          id: 'Bernadette'
        },
        Cuthbert: {
          hand: ['clubs-04', 'clubs-07', 'trumps-12'],
          tricks: [],
          id: 'Cuthbert'
        }
      },
      playerOrder: [],
      chien: [],
      roundOpener: '1234',
      currentTrick: [
        {card: 'clubs-05', player: '1234'},
        {card: 'clubs-03', player: 'Alberto'},
        {card: 'clubs-06', player: 'Bernadette'}
      ],
      playerTurn: 'Cuthbert',
      bidTaker: '1234'
    };
    const playedCard = playCard(game, 'Cuthbert');

    expect(playedCard).toBe('clubs-07');
  });
});
