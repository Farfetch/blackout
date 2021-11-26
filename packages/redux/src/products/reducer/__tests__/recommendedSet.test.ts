import * as actionTypes from '../../actionTypes';
import {
  getError,
  getIsLoading,
  getResult,
  INITIAL_STATE,
  recommendedSetsReducer,
} from '../recommendedSet';
import {
  mockRecommendedSet,
  mockRecommendedSetId,
} from 'tests/__fixtures__/products';

describe('recommended sets redux recommendedSetsReducer', () => {
  let initialState;
  const randomAction = { type: 'this_is_a_random_action' };

  beforeEach(() => {
    initialState = INITIAL_STATE;
  });

  describe('error() reducer', () => {
    it('should return the initial state', () => {
      const state = recommendedSetsReducer(undefined, randomAction).error;

      expect(state).toEqual(initialState.error);
    });

    it('should handle FETCH_RECOMMENDED_SET_REQUEST action type', () => {
      expect(
        recommendedSetsReducer(undefined, {
          meta: { recommendedSetId: mockRecommendedSetId },
          type: actionTypes.FETCH_RECOMMENDED_SET_REQUEST,
        }).error,
      ).toEqual(initialState.error);
    });

    it('should handle FETCH_RECOMMENDED_SET_FAILURE action type', () => {
      const expectedResult = { [mockRecommendedSetId]: 'foo' };

      expect(
        recommendedSetsReducer(undefined, {
          meta: { recommendedSetId: mockRecommendedSetId },
          payload: { error: 'foo' },
          type: actionTypes.FETCH_RECOMMENDED_SET_FAILURE,
        }).error,
      ).toEqual(expectedResult);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { ...initialState, error: 'foo' };

      expect(recommendedSetsReducer(state, randomAction).error).toEqual(
        state.error,
      );
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = recommendedSetsReducer(undefined, randomAction).isLoading;

      expect(state).toEqual(initialState.isLoading);
    });

    it('should handle FETCH_RECOMMENDED_SET_REQUEST action type', () => {
      expect(
        recommendedSetsReducer(undefined, {
          meta: { recommendedSetId: mockRecommendedSetId },
          type: actionTypes.FETCH_RECOMMENDED_SET_REQUEST,
        }).isLoading,
      ).toEqual({ [mockRecommendedSetId]: true });
    });

    it('should handle FETCH_RECOMMENDED_SET_FAILURE action type', () => {
      expect(
        recommendedSetsReducer(undefined, {
          meta: { recommendedSetId: mockRecommendedSetId },
          payload: { error: '' },
          type: actionTypes.FETCH_RECOMMENDED_SET_FAILURE,
        }).isLoading,
      ).toEqual({ [mockRecommendedSetId]: undefined });
    });

    it('should handle FETCH_RECOMMENDED_SET_SUCCESS action type', () => {
      expect(
        recommendedSetsReducer(undefined, {
          meta: { recommendedSetId: mockRecommendedSetId },
          payload: {
            result: mockRecommendedSetId,
          },
          type: actionTypes.FETCH_RECOMMENDED_SET_SUCCESS,
        }).isLoading,
      ).toEqual({ [mockRecommendedSetId]: false });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { ...initialState, isLoading: false };

      expect(recommendedSetsReducer(state, randomAction).isLoading).toEqual(
        state.isLoading,
      );
    });
  });

  describe('result() reducer', () => {
    it('should return the initial state', () => {
      const state = recommendedSetsReducer(undefined, randomAction).result;

      expect(state).toEqual(initialState.result);
    });

    it('should handle FETCH_RECOMMENDED_SET_SUCCESS action type', () => {
      expect(
        recommendedSetsReducer(undefined, {
          meta: { recommendedSetId: mockRecommendedSetId },
          payload: {
            result: mockRecommendedSet,
          },
          type: actionTypes.FETCH_RECOMMENDED_SET_SUCCESS,
        }).result,
      ).toEqual({ [mockRecommendedSetId]: mockRecommendedSet });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...initialState,
        result: { [mockRecommendedSetId]: mockRecommendedSet },
      };

      expect(recommendedSetsReducer(state, randomAction).result).toEqual(
        state.result,
      );
    });
  });

  describe('selectors', () => {
    describe('getError()', () => {
      it('should return the `error` property from a given state', () => {
        const error = { [mockRecommendedSetId]: '234-foo' };
        const state = { ...initialState, error };

        expect(getError(state)).toBe(error);
      });
    });

    describe('getIsLoading()', () => {
      it('should return the `isLoading` property from a given state', () => {
        const isLoading = { [mockRecommendedSetId]: true };
        const state = { ...initialState, isLoading };

        expect(getIsLoading(state)).toEqual(isLoading);
      });
    });

    describe('getResult()', () => {
      it('should return the `result` property from a given state', () => {
        const result = { [mockRecommendedSetId]: mockRecommendedSet };
        const state = { ...initialState, result };

        expect(getResult(state)).toEqual(result);
      });
    });
  });
});
