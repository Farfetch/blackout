import * as fromBrands from '../reducer';
import * as selectors from '../selectors';
import { generateBrandsHash } from '../utils';
import {
  mockBrandId,
  mockBrandsResponse,
  mockQuery,
  mockState,
} from 'tests/__fixtures__/brands';

const hash = generateBrandsHash(mockQuery);

describe('brands redux selectors', () => {
  beforeEach(jest.clearAllMocks);

  describe('getBrandsHash()', () => {
    it('should get the brands hash property from state', () => {
      const spy = jest.spyOn(fromBrands, 'getHash');

      expect(selectors.getBrandsHash(mockState)).toEqual(hash);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('isBrandLoading()', () => {
    it('should get the brand loading status by id', () => {
      const spy = jest.spyOn(fromBrands, 'getIsLoading');

      expect(selectors.isBrandLoading(mockState, mockBrandId)).toBe(false);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('areBrandsLoading()', () => {
    it('should get the brands loading status by hash', () => {
      const spy = jest.spyOn(fromBrands, 'getIsLoading');

      expect(selectors.areBrandsLoading(mockState)).toBe(false);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getBrandError()', () => {
    it('should get the brands error by id', () => {
      const expectedResult = mockState.brands.error[mockBrandId];
      const spy = jest.spyOn(fromBrands, 'getError');

      expect(selectors.getBrandError(mockState, mockBrandId)).toEqual(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getBrandsError()', () => {
    it('should get the brands error by hash', () => {
      const expectedResult = mockState.brands.error[hash];
      const spy = jest.spyOn(fromBrands, 'getError');

      expect(selectors.getBrandsError(mockState)).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getBrandsResult()', () => {
    it('should return an object with the result stored for hash received', () => {
      const result = selectors.getBrandsResult(mockState);

      expect(result).toEqual(mockBrandsResponse);
    });

    it('should return undefined when no result is stored for the hash received', () => {
      const result = selectors.getBrandsResult(mockState, 'brands?gender=1');

      expect(result).toBeUndefined();
    });
  });

  describe('isBrandsResultCached()', () => {
    it('should return true if brands for a specific hash is already cached', () => {
      expect(selectors.isBrandsResultCached(mockState)).toBe(true);
    });

    it('should return false if brands for a specific hash is not cached', () => {
      expect(selectors.isBrandsResultCached(mockState, 'brands?gender=1')).toBe(
        false,
      );
    });
  });

  describe('getBrand()', () => {
    it('should return the brand entity', () => {
      expect(selectors.getBrand(mockState, mockBrandId)).toEqual(
        mockState.entities.brands[mockBrandId],
      );
    });
  });

  describe('getBrands()', () => {
    it('should return all the brands entities', () => {
      expect(selectors.getBrands(mockState)).toEqual(mockState.entities.brands);
    });
  });
});
