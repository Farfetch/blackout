import * as fromReducer from '../reducer';
import { mockListingHash, mockProductId } from 'tests/__fixtures__/products';
import reducer, { actionTypes } from '../';

let initialState;

describe('details redux reducer', () => {
  beforeEach(() => {
    initialState = reducer();
  });

  describe('reset handling', () => {
    it('should return the initial state', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.RESET_LISTING_STATE,
        }),
      ).toEqual(initialState);
    });
  });

  describe('error() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().error;

      expect(state).toEqual(initialState.error);
      expect(state).toEqual({});
    });

    it('should handle GET_LISTING_REQUEST action type', () => {
      const expectedResult = { [mockListingHash]: undefined };
      expect(
        reducer(undefined, {
          type: actionTypes.GET_LISTING_REQUEST,
          payload: { hash: mockListingHash },
        }).error,
      ).toEqual(expectedResult);
    });

    it('should handle GET_LISTING_FAILURE action type', () => {
      const expectedResult = { [mockListingHash]: 'foo' };

      expect(
        reducer(undefined, {
          type: actionTypes.GET_LISTING_FAILURE,
          payload: { hash: mockListingHash, error: 'foo' },
        }).error,
      ).toEqual(expectedResult);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { error: 'foo' };

      expect(reducer(state).error).toBe(state.error);
    });
  });

  describe('hash() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().hash;

      expect(state).toBe(initialState.hash);
      expect(state).toBeNull();
    });

    it('should handle SET_LISTING_HASH action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.SET_LISTING_HASH,
          payload: { hash: mockListingHash },
        }).hash,
      ).toBe(mockListingHash);
    });

    it('should handle GET_LISTING_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_LISTING_FAILURE,
          payload: { hash: mockListingHash, error: {} },
        }).hash,
      ).toBe(initialState.hash);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { hash: mockListingHash };

      expect(reducer(state).hash).toBe(state.hash);
    });
  });

  describe('isHydrated() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().isHydrated;

      expect(state).toEqual(initialState.isHydrated);
      expect(state).toEqual({});
    });

    it('should handle DEHYDRATE_LISTING action type', () => {
      expect(
        reducer(undefined, {
          payload: { hash: mockListingHash },
          type: actionTypes.DEHYDRATE_LISTING,
        }).isHydrated,
      ).toEqual({ [mockListingHash]: false });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { isHydrated: { [mockListingHash]: false } };

      expect(reducer(state).isHydrated).toEqual(state.isHydrated);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().isLoading;

      expect(state).toEqual(initialState.isLoading);
      expect(state).toEqual({});
    });

    it('should handle GET_LISTING_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_LISTING_REQUEST,
          payload: { foo: 'bar', hash: mockListingHash },
        }).isLoading,
      ).toEqual({ [mockListingHash]: true });
    });

    it('should handle GET_LISTING_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_LISTING_FAILURE,
          payload: { error: '', hash: mockListingHash },
        }).isLoading,
      ).toEqual({ [mockListingHash]: undefined });
    });

    it('should handle GET_LISTING_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_LISTING_SUCCESS,
          payload: { result: { foo: 'bar' }, hash: mockListingHash },
        }).isLoading,
      ).toEqual({ [mockListingHash]: false });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { isLoading: { [mockListingHash]: false } };

      expect(reducer(state).isLoading).toEqual(state.isLoading);
    });
  });

  describe('entitiesMapper()', () => {
    it(`should handle ${actionTypes.RESET_LISTING_ENTITIES} action type`, () => {
      const state = {
        searchResults: {
          [mockListingHash]: { id: mockListingHash },
        },
        products: {
          [mockProductId]: { id: mockProductId },
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
        fromReducer.entitiesMapper[actionTypes.RESET_LISTING_ENTITIES](state),
      ).toEqual(expectedResult);
    });
  });

  describe('getError() selector', () => {
    it('should return the `error` property from a given state', () => {
      const error = 'foo';

      expect(fromReducer.getError({ error })).toBe(error);
    });
  });

  describe('getHash() selector', () => {
    it('should return the `hash` property from a given state', () => {
      const hash = mockListingHash;

      expect(fromReducer.getHash({ hash })).toBe(mockListingHash);
    });
  });

  describe('getIsLoading() selector', () => {
    it('should return the `isLoading` property from a given state', () => {
      const isLoading = true;

      expect(fromReducer.getIsLoading({ isLoading })).toEqual(isLoading);
    });
  });
  describe('getIsHydrated() selector', () => {
    it('should return the `isHydrated` property from a given state', () => {
      const isHydrated = true;

      expect(fromReducer.getIsHydrated({ isHydrated })).toEqual(isHydrated);
    });
  });
});
