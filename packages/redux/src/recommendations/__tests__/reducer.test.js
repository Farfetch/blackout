import { mockRecommendationsStrategy } from '../../../tests/__fixtures__/initialReduxState';
import reducer, { actionTypes } from '..';

let initialState;

describe('recommendations reducer', () => {
  beforeEach(() => {
    initialState = reducer();
  });

  const meta = { strategyName: mockRecommendationsStrategy };

  describe('error() reducer', () => {
    const error = 'An error occurred';
    const expectedError = {
      [mockRecommendationsStrategy]: error,
    };

    it('should return the initial state', () => {
      const state = reducer();

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
      const state = {
        error: {
          [mockRecommendationsStrategy]: error,
        },
      };

      expect(reducer(state).error).toEqual(state.error);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer();

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
      const state = {
        isLoading: {
          [mockRecommendationsStrategy]: false,
        },
      };

      expect(reducer(state).isLoading).toEqual(state.isLoading);
    });
  });

  describe('result() reducer', () => {
    const payload = {
      id: '0000-0000-0000-000',
      values: [
        {
          id: 12312312,
          score: 0.97,
        },
      ],
    };
    const expectedResult = {
      [mockRecommendationsStrategy]: payload,
    };
    it('should return the initial state', () => {
      const state = reducer();

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
      const state = {
        result: {
          [mockRecommendationsStrategy]: payload,
        },
      };

      expect(reducer(state).result).toEqual(state.result);
    });
  });
});
