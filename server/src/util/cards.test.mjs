/* global describe, it, expect */
import {
  dealCards,
  getAllowedCards,
  getTrickWinner,
  sortCards
} from './cards';
import {suitsAndTrumps, chienSizes} from '../constants';

describe('cards util functions', () => {
  describe('dealCards', () => {
    it('should deal cards for 4 players', () => {
      const deal = dealCards();
      const chienSize = chienSizes[4];

      expect(deal.chien.length).toEqual(chienSize);
      expect(deal.hands.length).toEqual(4);
      expect(deal.hands[0].length).toEqual((78 - chienSize) / 4);
    });
    it('should deal cards for 5 players', () => {
      const deal = dealCards(5);
      const chienSize = chienSizes[5];

      expect(deal.chien.length).toEqual(chienSize);
      expect(deal.hands.length).toEqual(5);
      expect(deal.hands[0].length).toEqual((78 - chienSize) / 5);
    });
  });
  describe('sortCards', () => {
    const shuffledHand = [
      'clubs-01',
      'spades-02',
      'hearts-03',
      'spades-03',
      'trumps-02',
      'hearts-02',
      'trumps-00',
      'diamonds-01',
      'diamonds-02',
      'clubs-03',
      'trumps-03',
      'spades-01',
      'trumps-01',
      'diamonds-03',
      'hearts-01',
      'clubs-02'
    ];

    it('should sort your cards', () => {
      expect(sortCards(shuffledHand)).toEqual([
        'clubs-01',
        'clubs-02',
        'clubs-03',
        'diamonds-01',
        'diamonds-02',
        'diamonds-03',
        'spades-01',
        'spades-02',
        'spades-03',
        'hearts-01',
        'hearts-02',
        'hearts-03',
        'trumps-01',
        'trumps-02',
        'trumps-03',
        'trumps-00'
      ]);
    });
    it('should sort your cards in reverse value order', () => {
      expect(sortCards(shuffledHand, suitsAndTrumps, 'desc')).toEqual([
        'clubs-03',
        'clubs-02',
        'clubs-01',
        'diamonds-03',
        'diamonds-02',
        'diamonds-01',
        'spades-03',
        'spades-02',
        'spades-01',
        'hearts-03',
        'hearts-02',
        'hearts-01',
        'trumps-03',
        'trumps-02',
        'trumps-01',
        'trumps-00'
      ]);
    });
    it('should sort your cards with a different suit order', () => {
      expect(
        sortCards(shuffledHand, [
          'trumps',
          'hearts',
          'spades',
          'clubs',
          'diamonds'
        ])
      ).toEqual([
        'trumps-01',
        'trumps-02',
        'trumps-03',
        'hearts-01',
        'hearts-02',
        'hearts-03',
        'spades-01',
        'spades-02',
        'spades-03',
        'clubs-01',
        'clubs-02',
        'clubs-03',
        'diamonds-01',
        'diamonds-02',
        'diamonds-03',
        'trumps-00'
      ]);
    });
    it('should not sort cards of same value (shouldnt happen anyway)', () => {
      expect(sortCards(['trumps-02', 'trumps-02'])).toEqual([
        'trumps-02',
        'trumps-02'
      ]);
    });
  });
  describe('getAllowedCards', () => {
    it('should return an array of cards to play in same suit', () => {
      const hand = ['hearts-01', 'hearts-02', 'spades-01', 'spades-02'];
      const trick = [{card: 'hearts-01'}];
      const allowedCards = ['hearts-01', 'hearts-02'];

      expect(getAllowedCards(trick, hand)).toEqual(allowedCards);
    });
    it('should return an array of trumps to play if player doesnt have demanded suit', () => {
      const hand = ['diamonds-01', 'diamonds-02', 'trumps-01', 'trumps-02'];
      const trick = [{card: 'hearts-01'}];
      const allowedCards = ['trumps-01', 'trumps-02'];

      expect(getAllowedCards(trick, hand)).toEqual(allowedCards);
    });
    it('should return an array of trumps higher than previous trumps', () => {
      const hand = ['diamonds-01', 'diamonds-02', 'trumps-01', 'trumps-05'];
      const trick = [{card: 'hearts-01'}, {card: 'trumps-02'}, {card: 'trumps-04'}];
      const allowedCards = ['trumps-05'];

      expect(getAllowedCards(trick, hand)).toEqual(allowedCards);
    });
    it('should return an array of all trumps if player doesnt have any higher', () => {
      const hand = ['diamonds-01', 'diamonds-02', 'trumps-01', 'trumps-03'];
      const trick = [{card: 'hearts-01'}, {card: 'trumps-02'}, {card: 'trumps-04'}];
      const allowedCards = ['trumps-01', 'trumps-03'];

      expect(getAllowedCards(trick, hand)).toEqual(allowedCards);
    });
    it('should return an array with all cards if player doesnt have either demanded suit or trump cards', () => {
      const hand = ['diamonds-01', 'diamonds-02', 'clubs-01', 'clubs-03'];
      const trick = [{card: 'hearts-01'}, {card: 'trumps-02'}, {card: 'trumps-04'}];
      const allowedCards = ['diamonds-01', 'diamonds-02', 'clubs-01', 'clubs-03'];

      expect(getAllowedCards(trick, hand)).toEqual(allowedCards);
    });
  });
  describe('getTrickWinner', () => {
    it('should return winning player in a trick with homogenous suit', () => {
      const trick = [
        {player: 'a', card: 'hearts-01'},
        {player: 'b', card: 'hearts-04'},
        {player: 'c', card: 'hearts-07'},
        {player: 'd', card: 'hearts-13'}
      ];

      expect(getTrickWinner(trick)).toEqual('d');
    });
    it('should return winning player in a trick with homogenous suit (different order)', () => {
      const trick = [
        {player: 'a', card: 'hearts-01'},
        {player: 'b', card: 'hearts-14'},
        {player: 'c', card: 'hearts-07'},
        {player: 'd', card: 'hearts-12'}
      ];

      expect(getTrickWinner(trick)).toEqual('b');
    });
    it('should return winning player in a trick with trumps', () => {
      const trick = [
        {player: 'a', card: 'hearts-01'},
        {player: 'b', card: 'hearts-14'},
        {player: 'c', card: 'trumps-07'},
        {player: 'd', card: 'hearts-12'}
      ];

      expect(getTrickWinner(trick)).toEqual('c');
    });
    it('should return winning player in a trick with more than one trump card', () => {
      const trick = [
        {player: 'a', card: 'hearts-01'},
        {player: 'b', card: 'hearts-14'},
        {player: 'c', card: 'trumps-07'},
        {player: 'd', card: 'trumps-12'}
      ];

      expect(getTrickWinner(trick)).toEqual('d');
    });
    it('should return winning player in a trick with the excuse', () => {
      const trick = [
        {player: 'a', card: 'hearts-01'},
        {player: 'b', card: 'hearts-14'},
        {player: 'c', card: 'trumps-00'},
        {player: 'd', card: 'hearts-12'}
      ];

      expect(getTrickWinner(trick)).toEqual('b');
    });
    it('should return winning player in a trick where people do not have trumps or the demanded suit ', () => {
      const trick = [
        {player: 'a', card: 'hearts-01'},
        {player: 'b', card: 'hearts-14'},
        {player: 'c', card: 'hearts-03'},
        {player: 'd', card: 'clubs-12'}
      ];

      expect(getTrickWinner(trick)).toEqual('b');
    });
  });
});
