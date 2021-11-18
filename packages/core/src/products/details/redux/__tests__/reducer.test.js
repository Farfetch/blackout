import * as fromReducer from '../reducer';
import {
  mockMeasurements,
  mockProductId,
  mockSetId,
  mockSetWithOutOfStockId,
  mockSizeScaleId,
} from 'tests/__fixtures__/products';
import reducer, { actionTypes } from '..';

let initialState;

describe('details redux reducer', () => {
  beforeEach(() => {
    initialState = reducer();
  });

  describe('reset handling', () => {
    it('should return the initial state', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.RESET_DETAILS_STATE,
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

    it('should handle GET_PRODUCT_DETAILS_REQUEST action type', () => {
      const expectedResult = { [mockProductId]: undefined };
      expect(
        reducer(undefined, {
          type: actionTypes.GET_PRODUCT_DETAILS_REQUEST,
          payload: { productId: mockProductId },
        }).error,
      ).toEqual(expectedResult);
    });

    it('should handle GET_PRODUCT_DETAILS_FAILURE action type', () => {
      const expectedResult = { [mockProductId]: 'foo' };

      expect(
        reducer(undefined, {
          type: actionTypes.GET_PRODUCT_DETAILS_FAILURE,
          payload: { productId: mockProductId, error: 'foo' },
        }).error,
      ).toEqual(expectedResult);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { error: 'foo' };

      expect(reducer(state).error).toEqual(state.error);
    });
  });

  describe('id() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().id;

      expect(state).toBe(initialState.id);
      expect(state).toBeNull();
    });

    it('should handle GET_PRODUCT_DETAILS_SUCCESS action type', () => {
      const expectedResult = mockProductId;

      expect(
        reducer(undefined, {
          type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS,
          payload: { result: 'foo', productId: expectedResult },
        }).id,
      ).toBe(expectedResult);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { id: 'foo' };

      expect(reducer(state).id).toBe(state.id);
    });
  });

  describe('isHydrated() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().isHydrated;

      expect(state).toEqual(initialState.isHydrated);
      expect(state).toEqual({});
    });

    it('should handle DEHYDRATE_PRODUCT_DETAILS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.DEHYDRATE_PRODUCT_DETAILS,
          payload: { productId: mockProductId },
        }).isHydrated,
      ).toEqual({ [mockProductId]: false });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { isHydrated: { foo: false } };

      expect(reducer(state).isHydrated).toEqual(state.isHydrated);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().isLoading;

      expect(state).toEqual(initialState.isLoading);
      expect(state).toEqual({});
    });

    it('should handle GET_PRODUCT_DETAILS_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_PRODUCT_DETAILS_REQUEST,
          payload: { productId: mockProductId },
        }).isLoading,
      ).toEqual({ [mockProductId]: true });
    });

    it('should handle GET_PRODUCT_DETAILS_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_PRODUCT_DETAILS_FAILURE,
          payload: { error: '', productId: mockProductId },
        }).isLoading,
      ).toEqual({ [mockProductId]: undefined });
    });

    it('should handle GET_PRODUCT_DETAILS_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS,
          payload: {
            productId: mockProductId,
            result: mockProductId,
          },
        }).isLoading,
      ).toEqual({ [mockProductId]: false });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { isLoading: { foo: false } };

      expect(reducer(state).isLoading).toEqual(state.isLoading);
    });
  });

  describe('attributes() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().attributes;

      expect(state).toEqual(initialState.attributes);
      expect(state).toEqual({ error: {}, isLoading: {} });
    });

    it('should handle GET_PRODUCT_ATTRIBUTES_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_PRODUCT_ATTRIBUTES_REQUEST,
          payload: { productId: mockProductId },
        }).attributes,
      ).toEqual({
        error: {},
        isLoading: { [mockProductId]: true },
      });
    });

    it('should handle GET_PRODUCT_ATTRIBUTES_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_PRODUCT_ATTRIBUTES_FAILURE,
          payload: { error: '', productId: mockProductId },
        }).attributes,
      ).toEqual({
        error: { [mockProductId]: '' },
        isLoading: { [mockProductId]: undefined },
      });
    });

    it('should handle GET_PRODUCT_ATTRIBUTES_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_PRODUCT_ATTRIBUTES_SUCCESS,
          payload: {
            productId: mockProductId,
            result: mockProductId,
          },
        }).attributes,
      ).toEqual({ error: {}, isLoading: { [mockProductId]: false } });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { attributes: { isLoading: { 456: false } } };

      expect(reducer(state).attributes).toEqual(state.attributes);
    });
  });

  describe('colorGrouping() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().colorGrouping;

      expect(state).toEqual(initialState.colorGrouping);
      expect(state).toEqual({
        currentPageIndex: {},
        error: {},
        isLoading: {},
      });
    });

    it('should handle GET_COLOR_GROUPING_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_COLOR_GROUPING_REQUEST,
          payload: { productId: mockProductId },
        }).colorGrouping,
      ).toEqual({
        currentPageIndex: {},
        error: {},
        isLoading: { [mockProductId]: true },
      });
    });

    it('should handle GET_COLOR_GROUPING_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_COLOR_GROUPING_FAILURE,
          payload: { error: '', productId: mockProductId },
        }).colorGrouping,
      ).toEqual({
        currentPageIndex: {},
        error: { [mockProductId]: '' },
        isLoading: { [mockProductId]: undefined },
      });
    });

    it('should handle GET_COLOR_GROUPING_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_COLOR_GROUPING_SUCCESS,
          payload: {
            productId: mockProductId,
            result: mockProductId,
          },
          meta: { number: 1 },
        }).colorGrouping,
      ).toEqual({
        currentPageIndex: { [mockProductId]: 1 },
        error: {},
        isLoading: { [mockProductId]: false },
      });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { colorGrouping: { isLoading: { 456: false } } };

      expect(reducer(state).colorGrouping).toEqual(state.colorGrouping);
    });
  });

  describe('fittings() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().fittings;

      expect(state).toEqual(initialState.fittings);
      expect(state).toEqual({ error: {}, isLoading: {} });
    });

    it('should handle FETCH_PRODUCT_FITTINGS_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_PRODUCT_FITTINGS_REQUEST,
          meta: { productId: mockProductId },
        }).fittings,
      ).toEqual({
        error: {},
        isLoading: { [mockProductId]: true },
      });
    });

    it('should handle FETCH_PRODUCT_FITTINGS_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_PRODUCT_FITTINGS_FAILURE,
          payload: { error: '' },
          meta: { productId: mockProductId },
        }).fittings,
      ).toEqual({
        error: { [mockProductId]: '' },
        isLoading: { [mockProductId]: undefined },
      });
    });

    it('should handle FETCH_PRODUCT_FITTINGS_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_PRODUCT_FITTINGS_SUCCESS,
          payload: { result: mockProductId },
          meta: { productId: mockProductId },
        }).fittings,
      ).toEqual({ error: {}, isLoading: { [mockProductId]: false } });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { fittings: { isLoading: { 456: false } } };

      expect(reducer(state).fittings).toEqual(state.fittings);
    });
  });

  describe('measurements() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().measurements;

      expect(state).toEqual(initialState.measurements);
      expect(state).toEqual({ error: {}, isLoading: {} });
    });

    it('should handle GET_MEASUREMENTS_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_MEASUREMENTS_REQUEST,
          payload: { productId: mockProductId },
        }).measurements,
      ).toEqual({
        error: {},
        isLoading: { [mockProductId]: true },
      });
    });

    it('should handle GET_MEASUREMENTS_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_MEASUREMENTS_FAILURE,
          payload: { error: '', productId: mockProductId },
        }).measurements,
      ).toEqual({
        error: { [mockProductId]: '' },
        isLoading: { [mockProductId]: undefined },
      });
    });

    it('should handle GET_MEASUREMENTS_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_MEASUREMENTS_SUCCESS,
          payload: {
            productId: mockProductId,
            result: mockProductId,
          },
        }).measurements,
      ).toEqual({ error: {}, isLoading: { [mockProductId]: false } });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { measurements: { isLoading: { 456: false } } };

      expect(reducer(state).measurements).toEqual(state.measurements);
    });
  });

  describe('recommendedSets() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().recommendedSets;

      expect(state).toEqual(initialState.recommendedSets);
      expect(state).toEqual({ error: {}, isLoading: {} });
    });

    it('should handle GET_RECOMMENDED_SET_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_RECOMMENDED_SET_REQUEST,
          payload: { recommendedSetId: mockSetId },
        }).recommendedSets,
      ).toEqual({
        error: {},
        isLoading: { [mockSetId]: true },
      });
    });

    it('should handle GET_RECOMMENDED_SET_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_RECOMMENDED_SET_FAILURE,
          payload: {
            error: '',
            recommendedSetId: mockSetId,
          },
        }).recommendedSets,
      ).toEqual({
        error: { [mockSetId]: '' },
        isLoading: { [mockSetId]: undefined },
      });
    });

    it('should handle GET_RECOMMENDED_SET_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_RECOMMENDED_SET_SUCCESS,
          payload: {
            recommendedSetId: mockSetId,
            result: { name: 'cool set' },
          },
        }).recommendedSets,
      ).toEqual({
        error: {},
        isLoading: { [mockSetId]: false },
      });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { recommendedSets: { isLoading: { 456: false } } };

      expect(reducer(state).recommendedSets).toEqual(state.recommendedSets);
    });
  });

  describe('recommendedSetsWithOutOfStock() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().recommendedSetsWithOutOfStock;

      expect(state).toEqual(initialState.recommendedSetsWithOutOfStock);
      expect(state).toEqual({ error: {}, isLoading: {} });
    });

    it('should handle FETCH_RECOMMENDED_SET_WITH_OOS_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_RECOMMENDED_SET_WITH_OOS_REQUEST,
          payload: { recommendedSetId: mockSetWithOutOfStockId },
        }).recommendedSetsWithOutOfStock,
      ).toEqual({
        error: {},
        isLoading: { [mockSetWithOutOfStockId]: true },
      });
    });

    it('should handle FETCH_RECOMMENDED_SET_WITH_OOS_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_RECOMMENDED_SET_WITH_OOS_FAILURE,
          payload: {
            error: '',
            recommendedSetId: mockSetWithOutOfStockId,
          },
        }).recommendedSetsWithOutOfStock,
      ).toEqual({
        error: { [mockSetWithOutOfStockId]: '' },
        isLoading: { [mockSetWithOutOfStockId]: undefined },
      });
    });

    it('should handle FETCH_RECOMMENDED_SET_WITH_OOS_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_RECOMMENDED_SET_WITH_OOS_SUCCESS,
          payload: {
            recommendedSetId: mockSetWithOutOfStockId,
            result: {
              id: mockSetWithOutOfStockId,
              platformSetId: 9999,
              name: 'cool recommended set',
              slug: 'cool-recommended-set',
              products: [mockProductId],
            },
          },
        }).recommendedSetsWithOutOfStock,
      ).toEqual({
        error: {},
        isLoading: { [mockSetWithOutOfStockId]: false },
      });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        recommendedSetsWithOutOfStock: { isLoading: { 456: false } },
      };

      expect(reducer(state).recommendedSetsWithOutOfStock).toEqual(
        state.recommendedSetsWithOutOfStock,
      );
    });
  });

  describe('sets() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().sets;

      expect(state).toEqual(initialState.sets);
      expect(state).toEqual({ error: {}, isLoading: {} });
    });

    it('should handle GET_SET_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_SET_REQUEST,
          meta: { setId: mockSetId },
        }).sets,
      ).toEqual({
        error: {},
        isLoading: { [mockSetId]: true },
      });
    });

    it('should handle GET_SET_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_SET_FAILURE,
          payload: { error: '' },
          meta: { setId: mockSetId },
        }).sets,
      ).toEqual({
        error: { [mockSetId]: '' },
        isLoading: { [mockSetId]: undefined },
      });
    });

    it('should handle GET_SET_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_SET_SUCCESS,
          payload: {
            result: { name: 'cool set' },
          },
          meta: { setId: mockSetId },
        }).sets,
      ).toEqual({ error: {}, isLoading: { [mockSetId]: false } });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { sets: { isLoading: { 456: false } } };

      expect(reducer(state).sets).toEqual(state.sets);
    });
  });

  describe('sizeguides() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().sizeguides;

      expect(state).toEqual(initialState.sizeguides);
      expect(state).toEqual({ error: {}, isLoading: {} });
    });

    it('should handle GET_PRODUCT_SIZEGUIDES_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          meta: { productId: mockProductId },
          type: actionTypes.GET_PRODUCT_SIZEGUIDES_REQUEST,
        }).sizeguides,
      ).toEqual({
        error: {},
        isLoading: { [mockProductId]: true },
      });
    });

    it('should handle GET_PRODUCT_SIZEGUIDES_FAILURE action type', () => {
      const mockError = 'Product sizeguides error';
      expect(
        reducer(undefined, {
          meta: { productId: mockProductId },
          type: actionTypes.GET_PRODUCT_SIZEGUIDES_FAILURE,
          payload: { error: mockError },
        }).sizeguides,
      ).toEqual({
        error: { [mockProductId]: mockError },
        isLoading: { [mockProductId]: undefined },
      });
    });

    it('should handle GET_PRODUCT_SIZEGUIDES_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          meta: { productId: mockProductId },
          type: actionTypes.GET_PRODUCT_SIZEGUIDES_SUCCESS,
          payload: { result: { product: mockProductId } },
        }).sizeguides,
      ).toEqual({ error: {}, isLoading: { [mockProductId]: false } });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { sizeguides: { isLoading: { 456: false } } };

      expect(reducer(state).sizeguides).toEqual(state.sizeguides);
    });
  });

  // @TODO: Remove these product sizescale tests in version 2.0.0.
  describe('sizeScale() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().sizeScale;

      expect(state).toEqual(initialState.sizeScale);
      expect(state).toEqual({ isLoading: {}, error: null });
    });

    it('should handle GET_SIZESCALE_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_SIZESCALE_REQUEST,
          payload: { scaleId: mockSizeScaleId },
        }).sizeScale,
      ).toEqual({ isLoading: { [mockSizeScaleId]: true }, error: null });
    });

    it('should handle GET_SIZESCALE_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_SIZESCALE_FAILURE,
          payload: { error: 'error', scaleId: mockSizeScaleId },
        }).sizeScale,
      ).toEqual({
        error: { message: 'error', scaleId: mockSizeScaleId },
        isLoading: { [mockSizeScaleId]: undefined },
      });
    });

    it('should handle GET_SIZESCALE_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_SIZESCALE_SUCCESS,
          payload: { scaleId: mockSizeScaleId },
        }).sizeScale,
      ).toEqual({ isLoading: { [mockSizeScaleId]: false }, error: null });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        sizeScale: { isLoading: { foo: false }, error: null },
      };

      expect(reducer(state).sizeScale).toEqual(state.sizeScale);
    });
  });

  describe('sizes() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().sizes;

      expect(state).toEqual(initialState.sizes);
      expect(state).toEqual({ error: {}, isLoading: {} });
    });

    it('should handle GET_PRODUCT_SIZES_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          meta: { productId: mockProductId },
          type: actionTypes.GET_PRODUCT_SIZES_REQUEST,
        }).sizes,
      ).toEqual({
        error: {},
        isLoading: { [mockProductId]: true },
      });
    });

    it('should handle GET_PRODUCT_SIZES_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          meta: { productId: mockProductId },
          type: actionTypes.GET_PRODUCT_SIZES_FAILURE,
          payload: { error: '' },
        }).sizes,
      ).toEqual({
        error: { [mockProductId]: '' },
        isLoading: { [mockProductId]: undefined },
      });
    });

    it('should handle GET_PRODUCT_SIZES_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          meta: { productId: mockProductId },
          type: actionTypes.GET_PRODUCT_SIZES_SUCCESS,
          payload: { result: mockProductId },
        }).sizes,
      ).toEqual({ error: {}, isLoading: { [mockProductId]: false } });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { sizes: { isLoading: { 456: false } } };

      expect(reducer(state).sizes).toEqual(state.sizes);
    });
  });

  describe('merchantsLocations reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().merchantsLocations;

      expect(state).toEqual(initialState.merchantsLocations);
      expect(state).toEqual({ error: {}, isLoading: {} });
    });

    it('should handle GET_PRODUCT_MERCHANTS_LOCATIONS_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          meta: { productId: mockProductId },
          type: actionTypes.GET_PRODUCT_MERCHANTS_LOCATIONS_REQUEST,
        }).merchantsLocations,
      ).toEqual({
        error: {},
        isLoading: { [mockProductId]: true },
      });
    });

    it('should handle GET_PRODUCT_MERCHANTS_LOCATIONS_FAILURE action type', () => {
      const mockError = 'Product merchants locations error';
      expect(
        reducer(undefined, {
          meta: { productId: mockProductId },
          type: actionTypes.GET_PRODUCT_MERCHANTS_LOCATIONS_FAILURE,
          payload: { error: mockError },
        }).merchantsLocations,
      ).toEqual({
        error: { [mockProductId]: mockError },
        isLoading: { [mockProductId]: undefined },
      });
    });

    it('should handle GET_PRODUCT_MERCHANTS_LOCATIONS_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          meta: { productId: mockProductId },
          type: actionTypes.GET_PRODUCT_MERCHANTS_LOCATIONS_SUCCESS,
          payload: { result: { product: mockProductId } },
        }).merchantsLocations,
      ).toEqual({ error: {}, isLoading: { [mockProductId]: false } });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        merchantsLocations: { isLoading: { 456: false } },
      };

      expect(reducer(state).merchantsLocations).toEqual(
        state.merchantsLocations,
      );
    });
  });

  describe('entitiesMapper', () => {
    it('should map the GET_MEASUREMENTS_SUCCESS action to a new state', () => {
      const defaultState = { otherState: 'foo' };
      const newMeasurements = {
        products: {
          [mockProductId]: {
            measurements: mockMeasurements,
          },
        },
      };
      const state = {
        products: {
          [mockProductId]: {
            measurements: [],
          },
        },
        ...defaultState,
      };
      const action = {
        payload: {
          entities: newMeasurements,
          productId: mockProductId,
        },
        type: actionTypes.GET_MEASUREMENTS_SUCCESS,
      };

      expect(
        fromReducer.entitiesMapper[actionTypes.GET_MEASUREMENTS_SUCCESS](
          state,
          action,
        ),
      ).toEqual({ ...newMeasurements, ...defaultState });
    });

    it(`should handle ${actionTypes.RESET_DETAILS_ENTITIES} action type`, () => {
      const state = {
        products: {
          [mockProductId]: { id: mockProductId },
        },
        recommendedSets: {
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
        fromReducer.entitiesMapper[actionTypes.RESET_DETAILS_ENTITIES](state),
      ).toEqual(expectedResult);
    });
  });

  describe('selectors', () => {
    describe('getError()', () => {
      it('should return the `error` property from a given state', () => {
        const error = { [mockProductId]: '234-foo' };

        expect(fromReducer.getError({ error })).toBe(error);
      });
    });

    describe('getId()', () => {
      it('should return the `id` property from a given state', () => {
        expect(fromReducer.getId({ id: mockProductId })).toBe(mockProductId);
      });
    });

    describe('getIsHydrated()', () => {
      it('should return the `isHydrated` property from a given state', () => {
        const isHydrated = { [mockProductId]: true };

        expect(fromReducer.getIsHydrated({ isHydrated })).toEqual(isHydrated);
      });
    });

    describe('getIsLoading()', () => {
      it('should return the `isLoading` property from a given state', () => {
        const isLoading = { [mockProductId]: true };

        expect(fromReducer.getIsLoading({ isLoading })).toEqual(isLoading);
      });
    });

    describe('getAttributesError()', () => {
      it('should return the `attributes.error` property from a given state', () => {
        const attributes = { error: 'foo-bar' };

        expect(fromReducer.getAttributesError({ attributes })).toEqual(
          attributes.error,
        );
      });
    });

    describe('getAreAttributesLoading()', () => {
      it('should return the `attributes.loading` property from a given state', () => {
        const attributes = { isLoading: { foo: true } };

        expect(fromReducer.getAreAttributesLoading({ attributes })).toEqual(
          attributes.isLoading,
        );
      });
    });

    describe('getColorGroupingError()', () => {
      it('should return the `colorGrouping.error` property from a given state', () => {
        const colorGrouping = { error: 'foo-bar' };

        expect(fromReducer.getColorGroupingError({ colorGrouping })).toEqual(
          colorGrouping.error,
        );
      });
    });

    describe('getIsColorGroupingLoading()', () => {
      it('should return the `colorGrouping.loading` property from a given state', () => {
        const colorGrouping = { isLoading: { foo: true } };

        expect(
          fromReducer.getIsColorGroupingLoading({ colorGrouping }),
        ).toEqual(colorGrouping.isLoading);
      });
    });

    describe('getColorGroupingCurrentPageIndex()', () => {
      it('should return the `colorGrouping.currentPageIndex` property from a given state', () => {
        const colorGrouping = { currentPageIndex: { foo: true } };

        expect(
          fromReducer.getColorGroupingCurrentPageIndex({
            colorGrouping,
          }),
        ).toEqual(colorGrouping.currentPageIndex);
      });
    });

    describe('getMeasurementsError()', () => {
      it('should return the `measurements.error` property from a given state', () => {
        const measurements = { error: 'foo-bar' };

        expect(fromReducer.getMeasurementsError({ measurements })).toEqual(
          measurements.error,
        );
      });
    });

    describe('getAreMeasurementsLoading()', () => {
      it('should return the `measurements.loading` property from a given state', () => {
        const measurements = { isLoading: { foo: true } };

        expect(fromReducer.getAreMeasurementsLoading({ measurements })).toEqual(
          measurements.isLoading,
        );
      });
    });

    describe('getRecommendedSetError()', () => {
      it('should return the `recommendedSets.error` property from a given state', () => {
        const recommendedSets = { error: 'foo-bar' };

        expect(fromReducer.getRecommendedSetError({ recommendedSets })).toEqual(
          recommendedSets.error,
        );
      });
    });

    describe('getRecommendedSetIsLoading()', () => {
      it('should return the `recommendedSets.isLoading` property from a given state', () => {
        const recommendedSets = { isLoading: { foo: true } };

        expect(
          fromReducer.getRecommendedSetIsLoading({ recommendedSets }),
        ).toEqual(recommendedSets.isLoading);
      });
    });

    describe('getSizeguidesError()', () => {
      it('should return the `sizeguides.error` property from a given state', () => {
        const sizeguides = { error: 'foo-bar' };

        expect(fromReducer.getSizeguidesError({ sizeguides })).toEqual(
          sizeguides.error,
        );
      });
    });

    describe('getAreSizeguidesLoading()', () => {
      it('should return the `sizeguides.isLoading` property from a given state', () => {
        const sizeguides = { isLoading: { foo: true } };

        expect(fromReducer.getAreSizeguidesLoading({ sizeguides })).toEqual(
          sizeguides.isLoading,
        );
      });
    });

    describe('getSizeScaleError()', () => {
      it('should return the `sizeScale.error` property from a given state', () => {
        const sizeScale = { error: 'foo' };

        expect(fromReducer.getSizeScaleError({ sizeScale })).toEqual(
          sizeScale.error,
        );
      });
    });

    describe('getSizeScaleIsLoading()', () => {
      it('should return the `sizeScale.isLoading` property from a given state', () => {
        const sizeScale = { isLoading: { foo: true } };

        expect(fromReducer.getSizeScaleIsLoading({ sizeScale })).toEqual(
          sizeScale.isLoading,
        );
      });
    });

    describe('getSizesError()', () => {
      it('should return the `sizes.error` property from a given state', () => {
        const sizes = { error: 'foo-bar' };

        expect(fromReducer.getSizesError({ sizes })).toEqual(sizes.error);
      });
    });

    describe('getAreSizesLoading()', () => {
      it('should return the `sizes.loading` property from a given state', () => {
        const sizes = { isLoading: { foo: true } };

        expect(fromReducer.getAreSizesLoading({ sizes })).toEqual(
          sizes.isLoading,
        );
      });
    });

    describe('getMerchantsLocationsError()', () => {
      it('should return the `merchantsLocations.error` property from a given state', () => {
        const merchantsLocations = { error: { foo: 'foo' } };

        expect(
          fromReducer.getMerchantsLocationsError({
            merchantsLocations,
          }),
        ).toEqual(merchantsLocations.error);
      });
    });

    describe('getMerchantsLocationsIsLoading()', () => {
      it('should return the `merchantsLocations.isLoading` property from a given state', () => {
        const merchantsLocations = { isLoading: { foo: true } };

        expect(
          fromReducer.getMerchantsLocationsIsLoading({
            merchantsLocations,
          }),
        ).toEqual(merchantsLocations.isLoading);
      });
    });
  });
});
