import * as actionTypes from '../actionTypes';
import reducer, * as fromReducer from '../reducer';

describe('merchants locations redux reducer', () => {
  let initialState;
  const randomAction = { type: 'this_is_a_random_action' };

  beforeEach(() => {
    initialState = fromReducer.INITIAL_STATE;
  });

  describe('reset handling', () => {
    it('should return the initial state', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.RESET_MERCHANTS_LOCATIONS_STATE,
        }),
      ).toEqual(initialState);
    });
  });

  describe('error() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).error;

      expect(state).toBe(initialState.error);
    });

    it('should return the initial state with default action', () => {
      expect(reducer(undefined, {}).error).toBe(initialState.error);
    });

    it('should handle FETCH_MERCHANTS_LOCATIONS_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_MERCHANTS_LOCATIONS_REQUEST,
        }).error,
      ).toBe(initialState.error);
    });

    it('should handle FETCH_MERCHANTS_LOCATIONS_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_MERCHANTS_LOCATIONS_FAILURE,
          payload: { error: expectedResult },
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { ...initialState, error: 'foo' };

      expect(reducer(state, randomAction).error).toEqual(state.error);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).isLoading;

      expect(state).toEqual(initialState.isLoading);
    });

    it('should return the initial state with default action', () => {
      expect(reducer(undefined, {}).isLoading).toBe(initialState.isLoading);
    });

    it('should handle FETCH_MERCHANTS_LOCATIONS_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_MERCHANTS_LOCATIONS_REQUEST,
          payload: {
            result: 'foo',
            entities: { merchantsLocations: {} },
          },
        }).isLoading,
      ).toEqual(true);
    });

    it('should handle FETCH_MERCHANTS_LOCATIONS_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_MERCHANTS_LOCATIONS_FAILURE,
          payload: { error: '' },
        }).isLoading,
      ).toEqual(false);
    });

    it('should handle FETCH_MERCHANTS_LOCATIONS_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_MERCHANTS_LOCATIONS_SUCCESS,
          payload: {
            result: ['foo', 'bar'],
            entities: { merchantsLocations: {} },
          },
        }).isLoading,
      ).toEqual(false);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { ...initialState, isLoading: 'foo' };

      expect(reducer(state, randomAction).isLoading).toEqual(state.isLoading);
    });
  });

  describe('entitiesMapper()', () => {
    describe('reset merchants locations', () => {
      it(`should handle ${actionTypes.RESET_MERCHANTS_LOCATIONS_STATE} action type`, () => {
        const state = {
          merchantsLocations: {
            1: { id: 1 },
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

        expect(
          fromReducer.entitiesMapper[
            actionTypes.RESET_MERCHANTS_LOCATIONS_STATE
          ](state),
        ).toEqual(expectedResult);
      });
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
});