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

    it('should return undefined when there is no result', () => {
      const normalizedResult = null;

      const mockStateWithResult = merge({}, mockBaseState, {
        users: {
          returns: { result: normalizedResult },
        },
      });

      expect(selectors.getUserReturns(mockStateWithResult)).toBeUndefined();
    });

    it('should not include the return when it cannot find it in the return entities', () => {
      const normalizedResult = mockNormalizedUserReturnsResponse.result;
      const mockStateWithoutReturnEntities = {
        ...mockBaseState,
        entities: {
          ...mockBaseState.entities,
          returns: [],
        },
      };
      const expectedResponse = {
        number: 1,
        totalPages: 1,
        totalItems: 1,
        entries: [],
      };

      const mockStateWithResult = merge({}, mockStateWithoutReturnEntities, {
        users: {
          returns: { result: normalizedResult },
        },
      });

      expect(selectors.getUserReturns(mockStateWithResult)).toEqual(
        expectedResponse,
      );
    });

    it('should not include the return when it cannot find any return entities', () => {
      const normalizedResult = mockNormalizedUserReturnsResponse.result;
      const mockStateWithoutReturnEntities = {
        ...mockBaseState,
        entities: {
          ...mockBaseState.entities,
          returns: undefined,
        },
      };
      const expectedResponse = {
        number: 1,
        totalPages: 1,
        totalItems: 1,
        entries: [],
      };

      const mockStateWithResult = merge({}, mockStateWithoutReturnEntities, {
        users: {
          returns: { result: normalizedResult },
        },
      });

      expect(selectors.getUserReturns(mockStateWithResult)).toEqual(
        expectedResponse,
      );
    });

    it('should not include the return items when it cannot find them in the returnItems entities', () => {
      const normalizedResult = mockNormalizedUserReturnsResponse.result;
      const denormalizedResult = mockDenormalizedUserReturnsResponse.result;

      const mockStateWithoutReturnItemsEntities = {
        ...mockBaseState,
        entities: {
          ...mockBaseState.entities,
          returnItems: [],
        },
      };

      const expectedResponse = {
        ...denormalizedResult,
        entries: [{ ...denormalizedResult.entries[0], items: [] }],
      };

      const mockStateWithResult = merge(
        {},
        mockStateWithoutReturnItemsEntities,
        {
          users: {
            returns: { result: normalizedResult },
          },
        },
      );

      expect(selectors.getUserReturns(mockStateWithResult)).toEqual(
        expectedResponse,
      );
    });

    it('should not include the return items when it cannot find any returnItems entities', () => {
      const normalizedResult = mockNormalizedUserReturnsResponse.result;
      const denormalizedResult = mockDenormalizedUserReturnsResponse.result;

      const mockStateWithoutReturnItemsEntities = {
        ...mockBaseState,
        entities: {
          ...mockBaseState.entities,
          returnItems: undefined,
        },
      };

      const expectedResponse = {
        ...denormalizedResult,
        entries: [{ ...denormalizedResult.entries[0], items: [] }],
      };

      const mockStateWithResult = merge(
        {},
        mockStateWithoutReturnItemsEntities,
        {
          users: {
            returns: { result: normalizedResult },
          },
        },
      );

      expect(selectors.getUserReturns(mockStateWithResult)).toEqual(
        expectedResponse,
      );
    });
  });

  describe('areUserReturnsFetched()', () => {
    it('should return true if the returns were fetched', () => {
      const normalizedResult = mockNormalizedUserReturnsResponse.result;

      const mockStateWithResult = merge({}, mockBaseState, {
        users: {
          returns: { result: normalizedResult },
        },
      });

      expect(selectors.areUserReturnsFetched(mockStateWithResult)).toBeTruthy();
    });
  });
});
