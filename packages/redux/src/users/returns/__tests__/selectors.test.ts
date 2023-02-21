import * as selectors from '../selectors.js';
import { merge } from 'lodash-es';
import { mockBaseState } from '../../__fixtures__/state.fixtures.js';
import {
  mockDenormalizedUserReturnsResponse,
  mockNormalizedUserReturnsResponse,
} from 'tests/__fixtures__/users/index.mjs';

describe('redux selectors', () => {
  describe('areUserReturnsLoading()', () => {
    const mockLoadingState = merge({}, mockBaseState, {
      users: { returns: { isLoading: true } },
    });

    it('should return `isLoading` value from `returns` slice', () => {
      expect(selectors.areUserReturnsLoading(mockBaseState)).toBe(false);

      expect(selectors.areUserReturnsLoading(mockLoadingState)).toBe(true);
    });
  });

  describe('getUserReturnsError()', () => {
    const dummyError = new Error('dummy error');

    const mockErrorState = merge({}, mockBaseState, {
      users: { returns: { error: dummyError } },
    });

    it('should return `error` value from `returns` slice', () => {
      expect(selectors.getUserReturnsError(mockBaseState)).toBeNull();

      expect(selectors.getUserReturnsError(mockErrorState)).toBe(dummyError);
    });
  });

  describe('getUserReturns()', () => {
    it('should return `result` value from `returns` slice', () => {
      const normalizedResult = mockNormalizedUserReturnsResponse.result;
      const denormalizedResult = mockDenormalizedUserReturnsResponse.result;

      const mockStateWithResult = merge({}, mockBaseState, {
        users: {
          returns: { result: normalizedResult },
        },
      });

      expect(selectors.getUserReturns(mockStateWithResult)).toEqual(
        denormalizedResult,
      );
    });
  });
});
