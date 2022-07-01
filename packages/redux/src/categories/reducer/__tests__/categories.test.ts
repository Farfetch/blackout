import * as actionTypes from '../../actionTypes';
import * as fromReducer from '../categories';
import reducer from '../../reducer';

let initialState;
const randomAction = { type: 'this_is_a_random_action' };

describe('categories redux reducer', () => {
  beforeEach(() => {
    initialState = fromReducer.INITIAL_STATE;
  });

  describe('reset handling', () => {
    it('should return the initial state', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.RESET_CATEGORIES_STATE,
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

    it('should handle FETCH_CATEGORIES_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_CATEGORIES_REQUEST,
        }).error,
      ).toBe(initialState.error);
    });

    it('should handle FETCH_CATEGORIES_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_CATEGORIES_FAILURE,
          payload: { error: expectedResult },
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { ...initialState, error: 'foo' };

      expect(reducer(state, randomAction).error).toBe(state.error);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).isLoading;

      expect(state).toBe(false);
      expect(state).toEqual(initialState.isLoading);
    });

    it('should handle FETCH_CATEGORIES_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_CATEGORIES_REQUEST,
          payload: {
            result: 'foo',
            entities: { categories: {} },
          },
        }).isLoading,
      ).toEqual(true);
    });

    it('should handle FETCH_CATEGORIES_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_CATEGORIES_FAILURE,
          payload: { error: '' },
        }).isLoading,
      ).toEqual(false);
    });

    it('should handle FETCH_CATEGORIES_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_CATEGORIES_SUCCESS,
          payload: {
            result: ['foo', 'bar'],
            entities: { categories: {} },
          },
        }).isLoading,
      ).toEqual(initialState.isLoading);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { ...initialState, isLoading: 'foo' };

      expect(reducer(state, randomAction).isLoading).toEqual(state.isLoading);
    });
  });

  describe('isFetched() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).isFetched;

      expect(state).toBe(false);
      expect(state).toEqual(initialState.isFetched);
    });

    it('should handle FETCH_CATEGORIES_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_CATEGORIES_REQUEST,
          payload: {
            result: 'foo',
            entities: { categories: {} },
          },
        }).isFetched,
      ).toEqual(initialState.isFetched);
    });

    it('should handle FETCH_CATEGORIES_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_CATEGORIES_FAILURE,
          payload: { error: '' },
        }).isFetched,
      ).toEqual(initialState.isFetched);
    });

    it('should handle FETCH_CATEGORIES_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_CATEGORIES_SUCCESS,
          payload: {
            result: 'foo',
            entities: { categories: {} },
          },
        }).isFetched,
      ).toEqual(true);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { ...initialState, isFetched: 'foo' };

      expect(reducer(state, randomAction).isFetched).toEqual(state.isFetched);
    });
  });

  describe('getError() selector', () => {
    it('should return the `error` property from a given state', () => {
      const error = 'error';
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

  describe('getIsFetched() selector', () => {
    it('should return the `isFetched` property from a given state', () => {
      const isFetched = true;
      const state = { ...initialState, isFetched };

      expect(fromReducer.getIsFetched(state)).toBe(isFetched);
    });
  });
});
