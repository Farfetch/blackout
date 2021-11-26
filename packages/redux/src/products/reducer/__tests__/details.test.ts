import { actionTypes } from '../..';
import { mockProductId, mockSetId } from 'tests/__fixtures__/products';
import reducer, {
  entitiesMapper,
  getError,
  getId,
  getIsHydrated,
  getIsLoading,
  INITIAL_STATE,
} from '../details';
import type { ProductEntity } from '../../../entities/types';

const mockAction = { type: 'foo' };
const meta = { productId: mockProductId };
let initialState;

describe('details redux reducer', () => {
  beforeEach(() => {
    initialState = reducer(INITIAL_STATE, mockAction);
  });

  describe('reset handling', () => {
    it('should return the initial state', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.RESET_PRODUCT_DETAILS_STATE,
        }),
      ).toEqual(initialState);
    });
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

    it('should handle FETCH_PRODUCT_DETAILS_REQUEST action type', () => {
      const expectedResult = { [mockProductId]: undefined };
      const state = reducer(undefined, {
        meta,
        type: actionTypes.FETCH_PRODUCT_DETAILS_REQUEST,
      });

      expect(state.error).toEqual(expectedResult);
    });

    it('should handle FETCH_PRODUCT_DETAILS_FAILURE action type', () => {
      const state = reducer(undefined, {
        meta,
        payload: { error },
        type: actionTypes.FETCH_PRODUCT_DETAILS_FAILURE,
      });

      expect(state.error).toEqual(expectedError);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        error: { [mockProductId]: error },
        isLoading: {},
        id: mockProductId,
        isHydrated: {},
      };

      expect(reducer(state, mockAction).error).toEqual(state.error);
    });
  });

  describe('id() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(INITIAL_STATE, mockAction).id;

      expect(state).toBe(initialState.id);
    });

    it('should handle FETCH_PRODUCT_DETAILS_SUCCESS action type', () => {
      const state = reducer(undefined, {
        meta,
        payload: {
          entities: {
            products: {
              [mockProductId]: { id: mockProductId } as ProductEntity,
            },
          },
          result: 'foo',
        },
        type: actionTypes.FETCH_PRODUCT_DETAILS_SUCCESS,
      });

      expect(state.id).toBe(mockProductId);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        id: mockProductId,
        error: {},
        isLoading: {},
        isHydrated: {},
      };

      expect(reducer(state, mockAction).id).toBe(mockProductId);
    });
  });

  describe('isHydrated() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(INITIAL_STATE, mockAction).isHydrated;

      expect(state).toEqual(initialState.isHydrated);
    });

    it('should handle DEHYDRATE_PRODUCT_DETAILS action type', () => {
      const expectedIsHydrated = { [mockProductId]: false };
      const state = reducer(undefined, {
        meta,
        type: actionTypes.DEHYDRATE_PRODUCT_DETAILS,
      });

      expect(state.isHydrated).toEqual(expectedIsHydrated);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        isHydrated: { [mockProductId]: false },
        isLoading: {},
        id: mockProductId,
        error: {},
      };
      expect(reducer(state, mockAction).isHydrated).toEqual(state.isHydrated);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(INITIAL_STATE, mockAction).isLoading;

      expect(state).toEqual(initialState.isLoading);
    });

    it('should handle FETCH_PRODUCT_DETAILS_REQUEST action type', () => {
      const expectedIsLoading = {
        [mockProductId]: true,
      };
      const state = reducer(undefined, {
        meta,
        type: actionTypes.FETCH_PRODUCT_DETAILS_REQUEST,
      });

      expect(state.isLoading).toEqual(expectedIsLoading);
    });

    it('should handle FETCH_PRODUCT_DETAILS_FAILURE action type', () => {
      const expectedIsLoading = {
        [mockProductId]: undefined,
      };
      const state = reducer(undefined, {
        meta,
        payload: { error: '' },
        type: actionTypes.FETCH_PRODUCT_DETAILS_FAILURE,
      });

      expect(state.isLoading).toEqual(expectedIsLoading);
    });

    it('should handle FETCH_PRODUCT_DETAILS_SUCCESS action type', () => {
      const expectedIsLoading = {
        [mockProductId]: false,
      };
      const state = reducer(undefined, {
        meta,
        payload: {
          result: mockProductId,
        },
        type: actionTypes.FETCH_PRODUCT_DETAILS_SUCCESS,
      });

      expect(state.isLoading).toEqual(expectedIsLoading);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        isHydrated: {},
        isLoading: { [mockProductId]: false },
        id: mockProductId,
        error: {},
      };
      expect(reducer(state, mockAction).isLoading).toEqual(state.isLoading);
    });
  });

  describe('entitiesMapper', () => {
    it(`should handle ${actionTypes.RESET_PRODUCT_DETAILS_ENTITIES} action type`, () => {
      const state = {
        products: {
          [mockProductId]: { id: mockProductId },
        },
        sets: {
          [mockSetId]: { id: mockSetId },
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
        entitiesMapper[actionTypes.RESET_PRODUCT_DETAILS_ENTITIES](state),
      ).toEqual(expectedResult);
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

    describe('getId()', () => {
      it('should return the `id` property from a given state', () => {
        const state = { ...initialState, id: mockProductId };

        expect(getId(state)).toBe(mockProductId);
      });
    });

    describe('getIsHydrated()', () => {
      it('should return the `isHydrated` property from a given state', () => {
        const isHydrated = { [mockProductId]: true };
        const state = {
          ...initialState,
          isHydrated,
        };

        expect(getIsHydrated(state)).toEqual(isHydrated);
      });
    });

    describe('getIsLoading()', () => {
      it('should return the `isLoading` property from a given state', () => {
        const isLoading = { [mockProductId]: true };
        const state = {
          ...initialState,
          isLoading,
        };
        expect(getIsLoading(state)).toEqual(isLoading);
      });
    });
  });
});
