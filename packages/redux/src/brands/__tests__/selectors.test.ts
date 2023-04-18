import * as fromBrands from '../reducer.js';
import * as selectors from '../selectors.js';
import { GenderCode } from '@farfetch/blackout-client';
import { generateBrandsHash } from '../utils/index.js';
import {
  mockBrandId,
  mockBrandsQuery,
  mockBrandsResponse,
  mockErrorState,
  mockState,
} from 'tests/__fixtures__/brands/index.mjs';

const hash = generateBrandsHash(mockBrandsQuery);

describe('brands redux selectors', () => {
  beforeEach(jest.clearAllMocks);

  describe('isBrandLoading()', () => {
    it('should get the brand loading status by id', () => {
      const spy = jest.spyOn(fromBrands, 'getIsLoading');

      expect(selectors.isBrandLoading(mockState, mockBrandId)).toBe(false);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('areBrandsLoading()', () => {
    it('should get the brands loading status by query', () => {
      const spy = jest.spyOn(fromBrands, 'getIsLoading');

      expect(selectors.areBrandsLoading(mockState, mockBrandsQuery)).toBe(
        false,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getBrandError()', () => {
    it('should get the brands error by id', () => {
      const expectedResult = mockErrorState.brands.error[mockBrandId];
      const spy = jest.spyOn(fromBrands, 'getError');

      expect(selectors.getBrandError(mockErrorState, mockBrandId)).toEqual(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getBrandsError()', () => {
    it('should get the brands error by query', () => {
      const expectedResult =
        mockState.brands.error[hash as keyof typeof mockState.brands.error];
      const spy = jest.spyOn(fromBrands, 'getError');

      expect(selectors.getBrandsError(mockState, mockBrandsQuery)).toEqual(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getBrandsResult()', () => {
    it('should return an object with the result stored for query received', () => {
      const result = selectors.getBrandsResult(mockState, mockBrandsQuery);

      expect(result).toEqual(mockBrandsResponse);
    });

    it('should return undefined when no result is stored for the query received', () => {
      const result = selectors.getBrandsResult(mockState, {
        gender: GenderCode.Man,
      });

      expect(result).toBeUndefined();
    });
  });

  describe('isBrandsResultCached()', () => {
    it('should return true if brands for a specific query is already cached', () => {
      expect(selectors.isBrandsResultCached(mockState, mockBrandsQuery)).toBe(
        true,
      );
    });

    it('should return false if brands for a specific hash is not cached', () => {
      expect(
        selectors.isBrandsResultCached(mockState, { gender: GenderCode.Man }),
      ).toBe(false);
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
