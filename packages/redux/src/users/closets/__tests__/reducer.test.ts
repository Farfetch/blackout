import * as actionTypes from '../actionTypes.js';
import {
  mockGetUserClosetItemsResponse,
  mockGetUserClosetsResponse,
  mockState,
} from 'tests/__fixtures__/users/index.mjs';
import { toBlackoutError } from '@farfetch/blackout-client';
import reducer, * as fromReducer from '../reducer.js';
import type { UserClosetsState } from '../types/index.js';

let initialState: UserClosetsState;
const randomAction = { type: 'this_is_a_random_action' };

describe('closets reducer', () => {
  beforeEach(() => {
    initialState = fromReducer.INITIAL_STATE;
  });

  describe('reset handling', () => {
    it('RESET_USER_CLOSETS should return the initial state', () => {
      expect(
        reducer(mockState.closets, {
          type: actionTypes.RESET_USER_CLOSETS,
        }),
      ).toEqual(initialState);
    });
  });

  describe('error() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).error;

      expect(state).toBe(initialState.error);
      expect(state).toBeNull();
    });

    it.each([actionTypes.FETCH_USER_CLOSETS_REQUEST])(
      'should handle %s action type',
      actionType => {
        const state = {
          ...initialState,
          error: toBlackoutError(new Error('error')),
        };

        expect(
          reducer(state, {
            type: actionType,
          }).error,
        ).toBe(initialState.error);
      },
    );

    it.each([actionTypes.FETCH_USER_CLOSETS_FAILURE])(
      'should handle %s action type',
      actionType => {
        const state = {
          ...initialState,
          error: null,
        };
        const error = 'foo';

        expect(
          reducer(state, {
            payload: { error },
            type: actionType,
          }).error,
        ).toBe(error);
      },
    );

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...initialState,
        error: toBlackoutError(new Error('error')),
      };

      expect(reducer(state, randomAction).error).toBe(state.error);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).isLoading;

      expect(state).toBe(initialState.isLoading);
      expect(state).toBe(false);
    });

    it.each([actionTypes.FETCH_USER_CLOSETS_REQUEST])(
      'should handle %s action type',
      actionType => {
        const state = {
          ...initialState,
          isLoading: false,
        };

        expect(
          reducer(state, {
            type: actionType,
          }).isLoading,
        ).toBe(true);
      },
    );

    it.each([actionTypes.FETCH_USER_CLOSETS_SUCCESS])(
      'should handle %s action type',
      actionType => {
        const state = {
          ...initialState,
          isLoading: true,
        };

        expect(
          reducer(state, {
            payload: { result: '' },
            type: actionType,
          }).isLoading,
        ).toBe(initialState.isLoading);
      },
    );

    it.each([actionTypes.FETCH_USER_CLOSETS_FAILURE])(
      'should handle %s action type',
      actionType => {
        const state = {
          ...initialState,
          error: null,
        };
        const error = 'foo';

        expect(
          reducer(state, {
            payload: { error },
            type: actionType,
          }).isLoading,
        ).toBe(initialState.isLoading);
      },
    );

    it('should handle other actions by returning the previous state', () => {
      const state = { ...initialState, isLoading: false };

      expect(reducer(state, randomAction).isLoading).toBe(state.isLoading);
    });
  });

  describe('result() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).result;

      expect(state).toBe(initialState.result);
    });

    it.each([actionTypes.FETCH_USER_CLOSETS_SUCCESS])(
      'should handle %s action type',
      actionType => {
        const expectedResult = mockGetUserClosetsResponse;
        const state = {
          ...initialState,
          isLoading: true,
        };

        expect(
          reducer(state, {
            payload: expectedResult,
            type: actionType,
          }).result,
        ).toBe(expectedResult);
      },
    );

    it('should handle other actions by returning the previous state', () => {
      const state = mockState?.closets;

      expect(reducer(state, randomAction).result).toBe(state.result);
    });
  });

  describe('closet() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).closetItems;

      expect(state).toEqual(initialState.closetItems);
      expect(state).toEqual({ error: null, isLoading: false, result: null });
    });

    it('should handle FETCH_USER_CLOSET_ITEMS_REQUEST action type', () => {
      const state: UserClosetsState = {
        ...fromReducer.INITIAL_STATE,
        closetItems: {
          error: toBlackoutError(new Error('dummy error')),
          isLoading: false,
          result: null,
        },
      };

      expect(
        reducer(state, {
          type: actionTypes.FETCH_USER_CLOSET_ITEMS_REQUEST,
        }).closetItems,
      ).toEqual({
        error: null,
        isLoading: true,
      });
    });

    it('should handle FETCH_USER_CLOSET_ITEMS_FAILURE action type', () => {
      const state: UserClosetsState = {
        ...fromReducer.INITIAL_STATE,
        closetItems: {
          error: null,
          isLoading: true,
          result: null,
        },
      };

      expect(
        reducer(state, {
          type: actionTypes.FETCH_USER_CLOSET_ITEMS_FAILURE,
          payload: { error: toBlackoutError(new Error('dummy error')) },
        }).closetItems,
      ).toEqual({
        error: toBlackoutError(new Error('dummy error')),
        isLoading: false,
      });
    });

    it('should handle FETCH_USER_CLOSET_ITEMS_SUCCESS action type', () => {
      const state: UserClosetsState = {
        ...fromReducer.INITIAL_STATE,
        closetItems: {
          error: null,
          isLoading: true,
          result: null,
        },
      };

      const expectedResult = mockGetUserClosetItemsResponse;

      expect(
        reducer(state, {
          type: actionTypes.FETCH_USER_CLOSET_ITEMS_SUCCESS,
          payload: expectedResult,
        }).closetItems,
      ).toEqual({
        error: null,
        isLoading: false,
        result: expectedResult,
      });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...initialState,
        closetItems: { error: null, isLoading: false, result: null },
      };

      expect(reducer(state, randomAction).closetItems).toEqual(
        state.closetItems,
      );
    });
  });

  describe('getError() selector', () => {
    it('should return the `error` property from a given state', () => {
      expect(fromReducer.getError(initialState)).toBe(initialState.error);
    });
  });

  describe('getIsLoading() selector', () => {
    it('should return the `isLoading` property from a given state', () => {
      expect(fromReducer.getIsLoading(initialState)).toBe(
        initialState.isLoading,
      );
    });
  });

  describe('getResult() selector', () => {
    it('should return the `result` property from a given state', () => {
      expect(fromReducer.getResult(initialState)).toBe(initialState.result);
    });
  });

  describe('getUserCloset() selector', () => {
    it('should return the `closetItems` property from a given state', () => {
      expect(fromReducer.getUserClosetItems(initialState)).toBe(
        initialState.closetItems,
      );
    });
  });
});
