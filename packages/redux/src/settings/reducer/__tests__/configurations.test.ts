import * as actionTypes from '../../actionTypes';
import * as fromReducer from '../configurations';
import {
  mockConfiguration,
  mockConfigurationCode,
} from 'tests/__fixtures__/settings';
import { settingsReducer as reducer } from '../';
import { toBlackoutError } from '@farfetch/blackout-client';
import type { ConfigurationsState } from '../../types';

let initialState: ConfigurationsState;
const randomAction = { type: 'this_is_a_random_action' };

describe('configurations redux reducer', () => {
  beforeEach(() => {
    initialState = fromReducer.INITIAL_STATE;
  });

  describe('reset handling', () => {
    it('should return the initial state', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.RESET_CONFIGURATIONS_STATE,
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

    it('should handle FETCH_CONFIGURATIONS_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_CONFIGURATIONS_REQUEST,
        }).error,
      ).toBe(initialState.error);
    });

    it('should handle FETCH_CONFIGURATIONS_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_CONFIGURATIONS_FAILURE,
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

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).isLoading;

      expect(state).toBe(false);
      expect(state).toEqual(initialState.isLoading);
    });

    it('should handle FETCH_CONFIGURATIONS_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_CONFIGURATIONS_REQUEST,
          payload: {
            result: 'foo',
            entities: { configurations: {} },
          },
        }).isLoading,
      ).toBe(true);
    });

    it('should handle FETCH_CONFIGURATIONS_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_CONFIGURATIONS_FAILURE,
          payload: { error: '' },
        }).isLoading,
      ).toBe(false);
    });

    it('should handle FETCH_CONFIGURATIONS_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_CONFIGURATIONS_SUCCESS,
          payload: {
            result: {
              entries: [],
              number: 123,
              totalItems: 1,
              totalPages: 1,
            },
            entities: { configurations: {} },
          },
        }).isLoading,
      ).toEqual(initialState.isLoading);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { ...initialState, isLoading: false };

      expect(reducer(state, randomAction).isLoading).toEqual(state.isLoading);
    });
  });

  describe('getError() selector', () => {
    it('should return the `error` property from a given state', () => {
      const error = toBlackoutError(new Error('error'));
      const state = { ...initialState, error };

      expect(fromReducer.getError(state)).toBe(error);
    });
  });

  describe('getIsLoading() selector', () => {
    it('should return the `isLoading` property from a given state', () => {
      const isLoading = true;
      const state = { ...initialState, isLoading };

      expect(fromReducer.getIsLoading(state)).toBe(isLoading);
    });
  });

  describe('entitiesMapper()', () => {
    describe('reset configurations', () => {
      const state = {
        configurations: {
          [mockConfigurationCode]: {
            ...mockConfiguration,
          },
        },
        dummy: {
          1: { id: 1 },
        },
        dummy2: {
          2: { id: 2 },
        },
      };

      const expectedResult = {
        dummy: {
          1: { id: 1 },
        },
        dummy2: {
          2: { id: 2 },
        },
      };

      it(`should handle ${actionTypes.RESET_CONFIGURATIONS_STATE} action type`, () => {
        expect(
          fromReducer.entitiesMapper[actionTypes.RESET_CONFIGURATIONS_STATE](
            state,
          ),
        ).toEqual(expectedResult);
      });
    });
  });

  describe('getResult() selector', () => {
    it('should return the `result` property from a given state', () => {
      const result = ['1234'];
      const state = { ...initialState, result };

      expect(fromReducer.getResult(state)).toBe(result);
    });
  });
});
