import * as actionTypes from '../../actionTypes.js';
import * as fromReducer from '../topCategories.js';
import { INITIAL_STATE } from '../categories.js';
import {
  mockCategories,
  mockTopCategories,
} from 'tests/__fixtures__/categories/index.mjs';
import { toBlackoutError } from '@farfetch/blackout-client';
import type { TopCategoriesState } from '../../types/index.js';

let initialState: TopCategoriesState;
const reducer = fromReducer.default;
const randomAction = { type: 'this_is_a_random_action' };

describe('top categories redux reducer', () => {
  beforeEach(() => {
    initialState = fromReducer.INITIAL_STATE;
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).isLoading;

      expect(state).toBe(false);
      expect(state).toEqual(initialState.isLoading);
    });

    it('should handle FETCH_TOP_CATEGORIES_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_TOP_CATEGORIES_REQUEST,
        }).isLoading,
      ).toBe(true);
    });

    it('should handle FETCH_TOP_CATEGORIES_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_TOP_CATEGORIES_FAILURE,
          payload: { error: '' },
        }).isLoading,
      ).toBe(false);
    });

    it('should handle FETCH_TOP_CATEGORIES_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_TOP_CATEGORIES_SUCCESS,
          payload: {
            result: ['foo', 'bar'],
            entities: { categories: {} },
          },
        }).isLoading,
      ).toEqual(initialState.isLoading);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { ...initialState, isLoading: false };

      expect(reducer(state, randomAction).isLoading).toEqual(state.isLoading);
    });
  });

  describe('error() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, { type: '' }).error;

      expect(state).toBe(initialState.error);
      expect(state).toBeNull();
    });

    it('should handle FETCH_TOP_CATEGORIES_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_TOP_CATEGORIES_REQUEST,
        }).error,
      ).toBe(initialState.error);
    });

    it('should handle FETCH_TOP_CATEGORIES_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_TOP_CATEGORIES_FAILURE,
          payload: { error: expectedResult },
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...initialState,
        error: toBlackoutError(new Error('foo')),
      };

      expect(reducer(state, randomAction).error).toBe(state.error);
    });
  });

  describe('result() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).result;

      expect(state).toBeNull();
      expect(state).toEqual(initialState.result);
    });

    it.each(['FETCH_CATEGORIES_REQUEST', 'FETCH_TOP_CATEGORIES_REQUEST'])(
      'should handle %s action type',
      actionType => {
        expect(
          reducer(undefined, {
            type: actionType,
            payload: {
              result: ['foo', 'bar'],
              entities: { categories: {} },
            },
          }).result,
        ).toEqual(initialState.result);
      },
    );

    it.each(['FETCH_CATEGORIES_FAILURE', 'FETCH_TOP_CATEGORIES_FAILURE'])(
      'should handle %s action type',
      actionType => {
        expect(
          reducer(undefined, {
            type: actionType,
            payload: { error: '' },
          }).result,
        ).toEqual(initialState.result);
      },
    );

    it('should handle FETCH_CATEGORIES_SUCCESS action type', () => {
      const payload = {
        result: mockCategories.map(({ id }) => id),
        entities: { categories: mockCategories },
      };
      const expectedTopCategories = mockTopCategories.map(({ id }) => id);

      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_CATEGORIES_SUCCESS,
          payload,
        }).result,
      ).toEqual(expectedTopCategories);
    });

    it('should handle FETCH_TOP_CATEGORIES_SUCCESS action type', () => {
      const payload = {
        result: mockTopCategories.map(({ id }) => id),
        entities: { categories: mockTopCategories },
      };
      const expectedTopCategories = mockTopCategories.map(({ id }) => id);

      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_TOP_CATEGORIES_SUCCESS,
          payload,
        }).result,
      ).toEqual(expectedTopCategories);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { ...initialState, isLoading: false };

      expect(reducer(state, randomAction).isLoading).toEqual(state.isLoading);
    });
  });

  describe('getIsLoading() selector', () => {
    it('should return the top `isLoading` property from a given state', () => {
      const topIsLoading = true;
      const state = {
        ...INITIAL_STATE,
        top: { ...initialState, isLoading: topIsLoading },
        isFetched: false,
      };

      expect(fromReducer.getIsLoading(state)).toBe(topIsLoading);
    });
  });

  describe('getError() selector', () => {
    it('should return the top `error` property from a given state', () => {
      const topError = toBlackoutError(new Error('foo'));
      const state = {
        ...INITIAL_STATE,
        top: { ...initialState, error: topError },
        isFetched: false,
      };

      expect(fromReducer.getError(state)).toBe(topError);
    });
  });

  describe('getResult() selector', () => {
    it('should return the top `result` property from a given state', () => {
      const topResult = [1234, 5678];
      const state = {
        ...INITIAL_STATE,
        top: { ...initialState, result: topResult },
        isFetched: false,
      };

      expect(fromReducer.getResult(state)).toBe(topResult);
    });
  });
});
