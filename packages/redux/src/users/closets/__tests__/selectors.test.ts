import * as selectors from '../selectors.js';
import { merge } from 'lodash-es';
import { mockBaseState } from '../../__fixtures__/state.fixtures.js';
import {
  mockGetUserClosetItemsResponse,
  mockGetUserClosetsResponse,
} from 'tests/__fixtures__/users/index.mjs';

describe('redux selectors', () => {
  describe('areUserClosetsLoading()', () => {
    const mockLoadingState = merge({}, mockBaseState, {
      users: { closets: { isLoading: true } },
    });

    it('should return `isLoading` value from `closets` slice', () => {
      expect(selectors.areUserClosetsLoading(mockBaseState)).toBe(false);

      expect(selectors.areUserClosetsLoading(mockLoadingState)).toBe(true);
    });
  });

  describe('getUserClosetsError()', () => {
    const dummyError = new Error('dummy error');

    const mockErrorState = merge({}, mockBaseState, {
      users: { closets: { error: dummyError } },
    });

    it('should return `error` value from `closets` slice', () => {
      expect(selectors.getUserClosetsError(mockBaseState)).toBeNull();

      expect(selectors.getUserClosetsError(mockErrorState)).toBe(dummyError);
    });
  });

  describe('getUserClosets()', () => {
    it('should return `result` value from `closets` slice', () => {
      const userClosets = mockGetUserClosetsResponse;

      const mockStateWithResult = merge({}, mockBaseState, {
        users: {
          closets: { result: userClosets },
        },
      });

      expect(selectors.getUserClosets(mockStateWithResult)).toEqual(
        userClosets,
      );
    });
  });

  describe('areUserClosetsFetched()', () => {
    it('should return true if the user closets is fetched', () => {
      const userClosets = mockGetUserClosetsResponse;

      const mockStateWithResult = merge({}, mockBaseState, {
        users: {
          closets: { result: userClosets },
        },
      });

      expect(selectors.areUserClosetsFetched(mockStateWithResult)).toBeTruthy();
    });
  });

  describe('areUserClosetItemsLoading()', () => {
    const mockLoadingState = merge({}, mockBaseState, {
      users: {
        closets: {
          closetItems: {
            error: null,
            isLoading: true,
            result: null,
          },
        },
      },
    });

    it('should return `isLoading` value from `closets.closet` slice', () => {
      expect(selectors.areUserClosetItemsLoading(mockBaseState)).toBe(false);

      expect(selectors.areUserClosetItemsLoading(mockLoadingState)).toBe(true);
    });
  });

  describe('getUserClosetItemsError()', () => {
    const dummyError = new Error('dummy error');

    const mockErrorState = merge({}, mockBaseState, {
      users: { closets: { closetItems: { error: dummyError } } },
    });

    it('should return `error` value from `closets.closet` slice', () => {
      expect(selectors.getUserClosetItemsError(mockBaseState)).toBeNull();

      expect(selectors.getUserClosetItemsError(mockErrorState)).toBe(
        dummyError,
      );
    });
  });

  describe('getUserClosetItemsResult()', () => {
    const closetItems = mockGetUserClosetItemsResponse;

    const mockStateWithResult = merge({}, mockBaseState, {
      users: {
        closets: { closetItems: { result: closetItems } },
      },
    });

    it('should return `result` value from `closets.closet` slice', () => {
      expect(selectors.getUserClosetItemsResult(mockBaseState)).toBeNull();

      expect(selectors.getUserClosetItemsResult(mockStateWithResult)).toEqual(
        closetItems,
      );
    });
  });

  describe('areUserClosetItemsFetched()', () => {
    it('should return true if the user closet is fetched', () => {
      const userCloset = mockGetUserClosetItemsResponse;

      const mockStateWithResult = merge({}, mockBaseState, {
        users: {
          closets: { closetItems: { result: userCloset } },
        },
      });

      expect(
        selectors.areUserClosetItemsFetched(mockStateWithResult),
      ).toBeTruthy();
    });
  });
});
