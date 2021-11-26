import * as fromDesigners from '../reducer';
import * as selectors from '../selectors';
import {
  mockDesigners,
  mockHash,
  mockState,
} from 'tests/__fixtures__/designers';

describe('designers redux selectors', () => {
  beforeEach(jest.clearAllMocks);

  describe('areDesignersLoading()', () => {
    it('should get the loading status', () => {
      const spy = jest.spyOn(fromDesigners, 'getIsLoading');

      expect(selectors.areDesignersLoading(mockState, mockHash)).toBe(false);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should get the loading status without hash', () => {
      const spy = jest.spyOn(fromDesigners, 'getIsLoading');

      expect(selectors.areDesignersLoading(mockState)).toBe(false);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getDesignersResult()', () => {
    it('should get the result of a given designer result', () => {
      expect(selectors.getDesignersResult(mockState, mockHash)).toEqual(
        mockDesigners,
      );
    });

    it('should get the result of a given designer result without hash', () => {
      expect(selectors.getDesignersResult(mockState)).toEqual(mockDesigners);
    });
  });

  describe('getDesignersError()', () => {
    it('should get the error', () => {
      const expectedResult = mockState.designers.error[mockHash];
      const spy = jest.spyOn(fromDesigners, 'getError');

      expect(selectors.getDesignersError(mockState, mockHash)).toBe(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should get the error without hash', () => {
      const expectedResult = mockState.designers.error[mockHash];
      const spy = jest.spyOn(fromDesigners, 'getError');

      expect(selectors.getDesignersError(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('isDesignersResultCached()', () => {
    it('should check if designer result is cached', () => {
      expect(selectors.isDesignersResultCached(mockState, mockHash)).toBe(true);
    });

    it('should check if designer result is cached without hash', () => {
      expect(selectors.isDesignersResultCached(mockState)).toBe(true);
    });
  });

  describe('getDesignersResultHash()', () => {
    it('should get the designer result hash property from state', () => {
      const spy = jest.spyOn(fromDesigners, 'getHash');
      const expectedResult = mockState.designers.hash;

      expect(selectors.getDesignersResultHash(mockState)).toEqual(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
