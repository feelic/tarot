/* global describe, it, expect */
import {
  countBouts,
  countScore
  // getTargetPointDifference
} from './scores';

describe('score util functions', () => {
  describe('countBouts', () => {
    it('should count the number of bouts in a hand of cards', () => {
      const cards = [
        'trumps-01',
        'hearts-01',
        'trumps-21',
        'diamonds-03',
        'trumps-00'
      ];

      expect(countBouts(cards)).toEqual(3);
    });
    it('should count the number of bouts in a hand of cards', () => {
      const cards = [
        'trumps-02',
        'trumps-03',
        'hearts-01',
        'diamonds-01',
        'diamonds-02',
        'diamonds-03'
      ];

      expect(countBouts(cards)).toEqual(0);
    });
  });
  describe('countScore', () => {
    it('should return the added points value for a hand of cards', () => {
      const cards = [
        'hearts-14',
        'hearts-01',
        'trumps-21',
        'diamonds-03',
        'spades-11',
        'clubs-02'
      ];

      expect(countScore(cards)).toEqual(12);
    });
    it('should count the right points for a bout', () => {
      const cards = ['trumps-01'];

      expect(countScore(cards)).toEqual(4.5);
    });
    it('should count the right points for a king', () => {
      const cards = ['hearts-14'];

      expect(countScore(cards)).toEqual(4.5);
    });
    it('should count the right points for a queen', () => {
      const cards = ['hearts-13'];

      expect(countScore(cards)).toEqual(3.5);
    });
    it('should count the right points for a knight', () => {
      const cards = ['hearts-12'];

      expect(countScore(cards)).toEqual(2.5);
    });
    it('should count the right points for a jack', () => {
      const cards = ['hearts-11'];

      expect(countScore(cards)).toEqual(1.5);
    });
    it('should count the right points for a trump card', () => {
      const cards = ['trumps-12'];

      expect(countScore(cards)).toEqual(0.5);
    });
    it('should count the right points for a regular card', () => {
      const cards = ['hearts-06'];

      expect(countScore(cards)).toEqual(0.5);
    });
  });
  // describe('getTargetPointDifference', () => {
  //   it('should return the difference of points between points gotten by bid taker and success target (success)', () => {
  //     const cards = [
  //       'trumps-01',
  //       'hearts-14',
  //       'trumps-21',
  //       'diamonds-14',
  //       'trumps-00',
  //       'clubs-14',
  //       'spades-14',
  //       'clubs-13',
  //       'spades-13',
  //       'diamonds-01'
  //     ];
  //
  //     expect(getTargetPointDifference(cards)).toEqual(3);
  //   });
  //   it('should return the difference of points between points gotten by bid taker and success target (failure)', () => {
  //     const cards = [
  //       'trumps-01',
  //       'hearts-14',
  //       'trumps-21',
  //       'diamonds-14',
  //       'trumps-00',
  //       'clubs-14'
  //     ];
  //
  //     expect(getTargetPointDifference(cards)).toEqual(- 9);
  //   });
  // });
});
