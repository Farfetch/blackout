import * as actionTypes from '../actionTypes';
import reducer, * as fromReducer from '../reducer';

describe('merchants locations redux reducer', () => {
  let initialState;

  beforeEach(() => {
    initialState = reducer();
  });

  describe('reset handling', () => {
    it('should return the initial state', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.RESET_MERCHANTS_LOCATIONS,
        }),
      ).toEqual(initialState);
    });
  });

  describe('error() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().error;

      expect(state).toBe(initialState.error);
      expect(state).toBeNull();
    });

    it('should return the initial state with default action', () => {
      expect(reducer(undefined, {}).error).toBe(initialState.error);
    });

    it('should handle GET_MERCHANTS_LOCATIONS_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_MERCHANTS_LOCATIONS_REQUEST,
        }).error,
      ).toBe(initialState.error);
    });

    it('should handle GET_MERCHANTS_LOCATIONS_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          type: actionTypes.GET_MERCHANTS_LOCATIONS_FAILURE,
          payload: { error: expectedResult },
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { error: 'foo' };

      expect(reducer(state).error).toBe(state.error);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().isLoading;

      expect(state).toBe(false);
      expect(state).toEqual(initialState.isLoading);
    });

    it('should return the initial state with default action', () => {
      expect(reducer(undefined, {}).isLoading).toBe(initialState.isLoading);
    });

    it('should handle GET_MERCHANTS_LOCATIONS_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_MERCHANTS_LOCATIONS_REQUEST,
          payload: {
            result: 'foo',
            entities: { merchantsLocations: {} },
          },
        }).isLoading,
      ).toEqual(true);
    });

    it('should handle GET_MERCHANTS_LOCATIONS_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_MERCHANTS_LOCATIONS_FAILURE,
          payload: { error: '' },
        }).isLoading,
      ).toEqual(false);
    });

    it('should handle GET_MERCHANTS_LOCATIONS_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_MERCHANTS_LOCATIONS_SUCCESS,
          payload: {
            result: ['foo', 'bar'],
            entities: { merchantsLocations: {} },
          },
        }).isLoading,
      ).toEqual(false);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { isLoading: 'foo' };

      expect(reducer(state).isLoading).toEqual(state.isLoading);
    });
  });

  describe('entitiesMapper()', () => {
    describe('reset merchants locations', () => {
      it(`should handle ${actionTypes.RESET_MERCHANTS_LOCATIONS} action type`, () => {
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
          fromReducer.entitiesMapper[actionTypes.RESET_MERCHANTS_LOCATIONS](
            state,
          ),
        ).toEqual(expectedResult);
      });
    });
  });

  describe('getError() selector', () => {
    it('should return the `error` property from a given state', () => {
      const error = 'error';

      expect(fromReducer.getError({ error })).toBe(error);
    });
  });

  describe('getIsLoading() selector', () => {
    it('should return the `isLoading` property from a given state', () => {
      const isLoading = true;

      expect(fromReducer.getIsLoading({ isLoading })).toBe(isLoading);
    });
  });
});
