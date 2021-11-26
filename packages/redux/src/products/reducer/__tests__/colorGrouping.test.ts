import { actionTypes } from '../..';
import { mockProductId } from 'tests/__fixtures__/products';
import reducer, {
  getError,
  getIsLoading,
  INITIAL_STATE,
} from '../colorGrouping';

const mockAction = { type: 'foo' };
const meta = { productId: mockProductId };
let initialState;

describe('colorGrouping redux reducer', () => {
  beforeEach(() => {
    initialState = reducer(INITIAL_STATE, mockAction);
  });

  describe('error() reducer', () => {
    const error = 'An error occurred';
    const expectedError = {
      [mockProductId]: error,
    };

    it('should return the initial state', () => {
      const state = reducer(INITIAL_STATE, mockAction).error;

      expect(state).toEqual(initialState.error);
    });

    it('should handle FETCH_PRODUCT_COLOR_GROUPING_REQUEST action type', () => {
      const expectedResult = { [mockProductId]: undefined };
      const state = reducer(undefined, {
        meta,
        type: actionTypes.FETCH_PRODUCT_COLOR_GROUPING_REQUEST,
      });

      expect(state.error).toEqual(expectedResult);
    });

    it('should handle FETCH_PRODUCT_COLOR_GROUPING_FAILURE action type', () => {
      const state = reducer(undefined, {
        meta,
        payload: { error },
        type: actionTypes.FETCH_PRODUCT_COLOR_GROUPING_FAILURE,
      });

      expect(state.error).toEqual(expectedError);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        error: { [mockProductId]: error },
        isLoading: {},
      };

      expect(reducer(state, mockAction).error).toEqual(state.error);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(INITIAL_STATE, mockAction).isLoading;

      expect(state).toEqual(initialState.isLoading);
    });

    it('should handle FETCH_PRODUCT_COLOR_GROUPING_REQUEST action type', () => {
      const expectedIsLoading = {
        [mockProductId]: true,
      };
      const state = reducer(undefined, {
        meta,
        type: actionTypes.FETCH_PRODUCT_COLOR_GROUPING_REQUEST,
      });

      expect(state.isLoading).toEqual(expectedIsLoading);
    });

    it('should handle FETCH_PRODUCT_COLOR_GROUPING_FAILURE action type', () => {
      const expectedIsLoading = {
        [mockProductId]: undefined,
      };
      const state = reducer(undefined, {
        meta,
        payload: { error: '' },
        type: actionTypes.FETCH_PRODUCT_COLOR_GROUPING_FAILURE,
      });

      expect(state.isLoading).toEqual(expectedIsLoading);
    });

    it('should handle FETCH_PRODUCT_COLOR_GROUPING_SUCCESS action type', () => {
      const expectedIsLoading = {
        [mockProductId]: false,
      };
      const state = reducer(undefined, {
        meta,
        payload: {
          result: mockProductId,
        },
        type: actionTypes.FETCH_PRODUCT_COLOR_GROUPING_SUCCESS,
      });

      expect(state.isLoading).toEqual(expectedIsLoading);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        error: {},
        isLoading: { [mockProductId]: false },
      };

      expect(reducer(state, mockAction).isLoading).toEqual(state.isLoading);
    });
  });

  describe('selectors', () => {
    describe('getError()', () => {
      it('should return the `error` property from a given state', () => {
        const error = { [mockProductId]: '234-foo' };
        const state = { ...initialState, error };

        expect(getError(state)).toBe(error);
      });
    });

    describe('getIsLoading()', () => {
      it('should return the `isLoading` property from a given state', () => {
        const isLoading = { [mockProductId]: true };
        const state = { ...initialState, isLoading };

        expect(getIsLoading(state)).toBe(isLoading);
      });
    });
  });
});
