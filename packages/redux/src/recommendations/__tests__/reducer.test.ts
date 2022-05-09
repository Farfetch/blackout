import { mockRecommendationsStrategy } from 'tests/__fixtures__/recommendations';
import reducer, { actionTypes } from '..';
import type { State } from '../types';

let initialState: State;
const mockAction = { type: 'this_is_a_mock_action' };

describe('recommendations reducer', () => {
  beforeEach(() => {
    initialState = reducer(undefined, mockAction);
  });

  const meta = { strategyName: mockRecommendationsStrategy };

  describe('error() reducer', () => {
    const error = 'An error occurred';
    const expectedError = {
      [mockRecommendationsStrategy]: error,
    };

    it('should return the initial state', () => {
      const state = reducer(undefined, mockAction);

      expect(state.error).toEqual(initialState.error);
    });

    it(`should handle ${actionTypes.FETCH_PRODUCT_RECOMMENDATIONS_REQUEST} action type`, () => {
      const expectedError = {
        [mockRecommendationsStrategy]: undefined,
      };

      const state = reducer(undefined, {
        type: actionTypes.FETCH_PRODUCT_RECOMMENDATIONS_REQUEST,
        meta,
      });

      expect(state.error).toEqual(expectedError);
    });

    it(`should handle ${actionTypes.FETCH_PRODUCT_RECOMMENDATIONS_FAILURE} action type`, () => {
      const state = reducer(undefined, {
        type: actionTypes.FETCH_PRODUCT_RECOMMENDATIONS_FAILURE,
        payload: {
          error,
        },
        meta,
      });

      expect(state.error).toEqual(expectedError);
    });

    it('should handle other actions by returning the previous state', () => {
      const state: State = {
        error: {
          [mockRecommendationsStrategy]: { message: error },
        },
        isLoading: {},
        result: {},
      };

      expect(reducer(state, mockAction).error).toEqual(state.error);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, mockAction);

      expect(state.isLoading).toEqual(initialState.isLoading);
    });

    it(`should handle ${actionTypes.FETCH_PRODUCT_RECOMMENDATIONS_REQUEST} action type`, () => {
      const expectedIsLoading = {
        [mockRecommendationsStrategy]: true,
      };
      const state = reducer(undefined, {
        type: actionTypes.FETCH_PRODUCT_RECOMMENDATIONS_REQUEST,
        meta,
      });

      expect(state.isLoading).toEqual(expectedIsLoading);
    });

    it(`should handle ${actionTypes.FETCH_PRODUCT_RECOMMENDATIONS_SUCCESS} action type`, () => {
      const expectedIsLoading = {
        [mockRecommendationsStrategy]: false,
      };
      const state = reducer(undefined, {
        type: actionTypes.FETCH_PRODUCT_RECOMMENDATIONS_SUCCESS,
        meta,
      });

      expect(state.isLoading).toEqual(expectedIsLoading);
    });

    it(`should handle ${actionTypes.FETCH_PRODUCT_RECOMMENDATIONS_FAILURE} action type`, () => {
      const expectedIsLoading = {
        [mockRecommendationsStrategy]: undefined,
      };
      const state = reducer(undefined, {
        type: actionTypes.FETCH_PRODUCT_RECOMMENDATIONS_FAILURE,
        payload: {
          error: 'this is an error',
        },
        meta,
      });

      expect(state.isLoading).toEqual(expectedIsLoading);
    });

    it('should handle other actions by returning the previous state', () => {
      const state: State = {
        isLoading: {
          [mockRecommendationsStrategy]: false,
        },
        error: {},
        result: {},
      };

      expect(reducer(state, mockAction).isLoading).toEqual(state.isLoading);
    });
  });

  describe('result() reducer', () => {
    const payload = {
      id: '0000-0000-0000-000',
      values: [
        {
          id: '12312312',
          score: 0.97,
        },
      ],
    };
    const expectedResult = {
      [mockRecommendationsStrategy]: payload,
    };
    it('should return the initial state', () => {
      const state = reducer(undefined, mockAction);

      expect(state.result).toEqual(initialState.result);
    });

    it(`should handle ${actionTypes.FETCH_PRODUCT_RECOMMENDATIONS_SUCCESS} action type`, () => {
      const state = reducer(undefined, {
        type: actionTypes.FETCH_PRODUCT_RECOMMENDATIONS_SUCCESS,
        payload,
        meta,
      });

      expect(state.result).toEqual(expectedResult);
    });

    it('should handle other actions by returning the previous state', () => {
      const state: State = {
        result: {
          [mockRecommendationsStrategy]: payload,
        },
        error: {},
        isLoading: {},
      };

      expect(reducer(state, mockAction).result).toEqual(state.result);
    });
  });
});
