/* global describe, it, expect */
import {getNextPlayer} from './players';

describe('players util functions', () => {
  describe('getNextPlayer', () => {
    it('should return the next player in the order', () => {
      const order = ['a', 'b', 'c', 'd'];

      expect(getNextPlayer(order, 'b')).toEqual('c');
    });
    it('should return the next player in the order if the player is last in the array', () => {
      const order = ['a', 'b', 'c', 'd'];

      expect(getNextPlayer(order, 'd')).toEqual('a');
    });
  });
});
