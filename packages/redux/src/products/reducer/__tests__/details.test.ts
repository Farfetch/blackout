import { mockProductId } from 'tests/__fixtures__/products';
import { productsActionTypes } from '../..';
import reducer, {
  entitiesMapper,
  getError,
  getIsHydrated,
  getIsLoading,
  INITIAL_STATE,
} from '../details';

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
          type: productsActionTypes.RESET_PRODUCT_DETAILS_STATE,
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
        type: productsActionTypes.FETCH_PRODUCT_DETAILS_REQUEST,
      });

      expect(state.error).toEqual(expectedResult);
    });

    it('should handle FETCH_PRODUCT_DETAILS_FAILURE action type', () => {
      const state = reducer(undefined, {
        meta,
        payload: { error },
        type: productsActionTypes.FETCH_PRODUCT_DETAILS_FAILURE,
      });

      expect(state.error).toEqual(expectedError);
    });

    describe('should handle RESET_PRODUCT_DETAILS_STATE action type', () => {
      const defaultErrorState = {
        error: {
          [mockProductId]: new Error(),
          10000: new Error(),
          20000: new Error(),
          30000: new Error(),
        },
      };

      it('should handle a partial reset request', () => {
        // @ts-expect-error
        const state = reducer(defaultErrorState, {
          type: productsActionTypes.RESET_PRODUCT_DETAILS_STATE,
          productIds: [10000, 20000, 30000],
        });

        // Full reset product details state requests are handled by the outer reducer
        expect(state.error).toStrictEqual({
          [mockProductId]: expect.any(Error),
        });
      });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        error: { [mockProductId]: error },
        isLoading: {},
        isHydrated: {},
      };

      expect(reducer(state, mockAction).error).toEqual(state.error);
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
        type: productsActionTypes.DEHYDRATE_PRODUCT_DETAILS,
      });

      expect(state.isHydrated).toEqual(expectedIsHydrated);
    });

    describe('should handle RESET_PRODUCT_DETAILS_STATE action type', () => {
      const defaultIsHydratedState = {
        isHydrated: {
          [mockProductId]: false,
          10000: true,
          20000: true,
          30000: true,
        },
      };

      it('should handle a partial reset request', () => {
        // @ts-expect-error
        const state = reducer(defaultIsHydratedState, {
          type: productsActionTypes.RESET_PRODUCT_DETAILS_STATE,
          productIds: [10000, 20000, 30000],
        });

        // Full reset product details state requests are handled by the outer reducer
        expect(state.isHydrated).toStrictEqual({
          [mockProductId]: false,
        });
      });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        isHydrated: { [mockProductId]: false },
        isLoading: {},
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
        type: productsActionTypes.FETCH_PRODUCT_DETAILS_REQUEST,
      });

      expect(state.isLoading).toEqual(expectedIsLoading);
    });

    it('should handle FETCH_PRODUCT_DETAILS_FAILURE action type', () => {
      const expectedIsLoading = {
        [mockProductId]: false,
      };
      const state = reducer(undefined, {
        meta,
        payload: { error: '' },
        type: productsActionTypes.FETCH_PRODUCT_DETAILS_FAILURE,
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
        type: productsActionTypes.FETCH_PRODUCT_DETAILS_SUCCESS,
      });

      expect(state.isLoading).toEqual(expectedIsLoading);
    });

    describe('should handle RESET_PRODUCT_DETAILS_STATE action type', () => {
      const defaultIsLoadingState = {
        isLoading: {
          [mockProductId]: false,
          10000: true,
          20000: false,
          30000: true,
        },
      };

      it('should handle a partial reset request', () => {
        // @ts-expect-error
        const state = reducer(defaultIsLoadingState, {
          type: productsActionTypes.RESET_PRODUCT_DETAILS_STATE,
          productIds: [10000, 20000, 30000],
        });

        // Full reset product details state requests are handled by the outer reducer
        expect(state.isLoading).toStrictEqual({
          [mockProductId]: false,
        });
      });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        isHydrated: {},
        isLoading: { [mockProductId]: false },
        error: {},
      };
      expect(reducer(state, mockAction).isLoading).toEqual(state.isLoading);
    });
  });

  describe('entitiesMapper', () => {
    describe(`should handle ${productsActionTypes.RESET_PRODUCT_DETAILS_ENTITIES} action type`, () => {
      const state = {
        products: {
          [mockProductId]: { id: mockProductId },
          10000: { id: 10000 },
          20000: { id: 20000 },
          30000: { id: 30000 },
        },
        dummy: {
          1: { id: 1 },
        },
        dummy2: {
          2: { id: 2 },
        },
      };

      it('should handle full reset', () => {
        const expectedResult = {
          dummy: {
            1: { id: 1 },
          },
          dummy2: {
            2: { id: 2 },
          },
        };

        expect(
          entitiesMapper[productsActionTypes.RESET_PRODUCT_DETAILS_ENTITIES](
            state,
            { type: productsActionTypes.RESET_PRODUCT_DETAILS_ENTITIES },
          ),
        ).toStrictEqual(expectedResult);
      });

      it('should handle partial reset', () => {
        const expectedResult = {
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

        expect(
          entitiesMapper[productsActionTypes.RESET_PRODUCT_DETAILS_ENTITIES](
            state,
            {
              type: productsActionTypes.RESET_PRODUCT_DETAILS_ENTITIES,
              productIds: [10000, 20000, 30000],
            },
          ),
        ).toStrictEqual(expectedResult);
      });
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
