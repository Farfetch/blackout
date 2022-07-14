/**
 * @module products/details/reducer
 * @category Products details
 * @subcategory Reducer
 */
import * as actionTypes from './actionTypes';
import { combineReducers } from 'redux';
import { createMergedObject } from '../../../helpers/redux';

export const INITIAL_STATE = {
  attributes: {
    error: {},
    isLoading: {},
  },
  colorGrouping: {
    currentPageIndex: {},
    error: {},
    isLoading: {},
  },
  grouping: {
    currentPageIndex: {},
    error: {},
    isLoading: {},
  },
  groupingProperties: {
    error: {},
    isLoading: {},
  },
  error: {},
  fittings: {
    error: {},
    isLoading: {},
  },
  id: null,
  isHydrated: {},
  isLoading: {},
  measurements: {
    error: {},
    isLoading: {},
  },
  merchantsLocations: {
    error: {},
    isLoading: {},
  },
  recommendedSets: {
    error: {},
    isLoading: {},
  },
  recommendedSetsWithOutOfStock: {
    error: {},
    isLoading: {},
  },
  sets: {
    error: {},
    isLoading: {},
  },
  sizeguides: {
    error: {},
    isLoading: {},
  },
  sizes: {
    error: {},
    isLoading: {},
  },
  sizeScale: {
    error: null,
    isLoading: {},
  },
};

const error = (
  state = INITIAL_STATE.error,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        [action.payload.productId]: undefined,
      };
    case actionTypes.GET_PRODUCT_DETAILS_FAILURE:
      return {
        ...state,
        [action.payload.productId]: action.payload.error,
      };
    default:
      return state;
  }
};

const id = (
  state = INITIAL_STATE.id,
  /* istanbul ignore next */ action = {},
) => {
  if (action.type === actionTypes.GET_PRODUCT_DETAILS_SUCCESS) {
    return action.payload.productId;
  }
  return state;
};

const isHydrated = (
  state = INITIAL_STATE.isHydrated,
  /* istanbul ignore next */ action = {},
) => {
  if (action.type === actionTypes.DEHYDRATE_PRODUCT_DETAILS) {
    return {
      ...state,
      [action.payload.productId]: false,
    };
  }
  return state;
};

const isLoading = (
  state = INITIAL_STATE.isLoading,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        [action.payload.productId]: true,
      };
    case actionTypes.GET_PRODUCT_DETAILS_SUCCESS:
      return { ...state, [action.payload.productId]: false };
    case actionTypes.GET_PRODUCT_DETAILS_FAILURE:
      return { ...state, [action.payload.productId]: undefined };
    default:
      return state;
  }
};

const attributes = (
  state = INITIAL_STATE.attributes,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCT_ATTRIBUTES_REQUEST:
      return {
        isLoading: {
          ...state.isLoading,
          [action.payload.productId]: true,
        },
        error: INITIAL_STATE.attributes.error,
      };
    case actionTypes.GET_PRODUCT_ATTRIBUTES_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.payload.productId]: false,
        },
      };
    case actionTypes.GET_PRODUCT_ATTRIBUTES_FAILURE:
      return {
        isLoading: {
          ...state.isLoading,
          [action.payload.productId]: undefined,
        },
        error: {
          ...state.error,
          [action.payload.productId]: action.payload.error,
        },
      };
    default:
      return state;
  }
};

const colorGrouping = (
  state = INITIAL_STATE.colorGrouping,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.GET_COLOR_GROUPING_REQUEST:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.payload.productId]: true,
        },
        error: INITIAL_STATE.colorGrouping.error,
      };
    case actionTypes.GET_COLOR_GROUPING_SUCCESS:
      return {
        ...state,
        currentPageIndex: {
          ...state.currentPageIndex,
          [action.payload.productId]: action.meta.number,
        },
        isLoading: {
          ...state.isLoading,
          [action.payload.productId]: false,
        },
      };
    case actionTypes.GET_COLOR_GROUPING_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.payload.productId]: undefined,
        },
        error: {
          ...state.error,
          [action.payload.productId]: action.payload.error,
        },
      };
    default:
      return state;
  }
};

const fittings = (
  state = INITIAL_STATE.fittings,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCT_FITTINGS_REQUEST:
      return {
        isLoading: {
          ...state.isLoading,
          [action.meta.productId]: true,
        },
        error: INITIAL_STATE.fittings.error,
      };
    case actionTypes.FETCH_PRODUCT_FITTINGS_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.meta.productId]: false,
        },
      };
    case actionTypes.FETCH_PRODUCT_FITTINGS_FAILURE:
      return {
        isLoading: {
          ...state.isLoading,
          [action.meta.productId]: undefined,
        },
        error: {
          ...state.error,
          [action.meta.productId]: action.payload.error,
        },
      };
    default:
      return state;
  }
};

const measurements = (
  state = INITIAL_STATE.measurements,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.GET_MEASUREMENTS_REQUEST:
      return {
        isLoading: {
          ...state.isLoading,
          [action.payload.productId]: true,
        },
        error: INITIAL_STATE.measurements.error,
      };
    case actionTypes.GET_MEASUREMENTS_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.payload.productId]: false,
        },
      };
    case actionTypes.GET_MEASUREMENTS_FAILURE:
      return {
        isLoading: {
          ...state.isLoading,
          [action.payload.productId]: undefined,
        },
        error: {
          ...state.error,
          [action.payload.productId]: action.payload.error,
        },
      };
    default:
      return state;
  }
};

const recommendedSetsReducer = (
  state = INITIAL_STATE.recommendedSets,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.GET_RECOMMENDED_SET_REQUEST:
      return {
        isLoading: {
          ...state.isLoading,
          [action.payload.recommendedSetId]: true,
        },
        error: INITIAL_STATE.recommendedSets.error,
      };
    case actionTypes.GET_RECOMMENDED_SET_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.payload.recommendedSetId]: false,
        },
      };
    case actionTypes.GET_RECOMMENDED_SET_FAILURE:
      return {
        isLoading: {
          ...state.isLoading,
          [action.payload.recommendedSetId]: undefined,
        },
        error: {
          ...state.error,
          [action.payload.recommendedSetId]: action.payload.error,
        },
      };
    default:
      return state;
  }
};

const recommendedSetsWithOutOfStock = (
  state = INITIAL_STATE.recommendedSetsWithOutOfStock,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.FETCH_RECOMMENDED_SET_WITH_OOS_REQUEST:
      return {
        isLoading: {
          ...state.isLoading,
          [action.payload.recommendedSetId]: true,
        },
        error: INITIAL_STATE.recommendedSetsWithOutOfStock.error,
      };
    case actionTypes.FETCH_RECOMMENDED_SET_WITH_OOS_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.payload.recommendedSetId]: false,
        },
      };
    case actionTypes.FETCH_RECOMMENDED_SET_WITH_OOS_FAILURE:
      return {
        isLoading: {
          ...state.isLoading,
          [action.payload.recommendedSetId]: undefined,
        },
        error: {
          ...state.error,
          [action.payload.recommendedSetId]: action.payload.error,
        },
      };
    default:
      return state;
  }
};

const sets = (
  state = INITIAL_STATE.sets,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.GET_SET_REQUEST:
      return {
        isLoading: {
          ...state.isLoading,
          [action.meta.setId]: true,
        },
        error: INITIAL_STATE.sets.error,
      };
    case actionTypes.GET_SET_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.meta.setId]: false,
        },
      };
    case actionTypes.GET_SET_FAILURE:
      return {
        isLoading: {
          ...state.isLoading,
          [action.meta.setId]: undefined,
        },
        error: {
          ...state.error,
          [action.meta.setId]: action.payload.error,
        },
      };
    default:
      return state;
  }
};

const sizeguides = (
  state = INITIAL_STATE.sizeguides,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCT_SIZEGUIDES_REQUEST:
      return {
        isLoading: {
          ...state.isLoading,
          [action.meta.productId]: true,
        },
        error: INITIAL_STATE.sizeguides.error,
      };
    case actionTypes.GET_PRODUCT_SIZEGUIDES_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.meta.productId]: false,
        },
      };
    case actionTypes.GET_PRODUCT_SIZEGUIDES_FAILURE:
      return {
        isLoading: {
          ...state.isLoading,
          [action.meta.productId]: undefined,
        },
        error: {
          ...state.error,
          [action.meta.productId]: action.payload.error,
        },
      };
    default:
      return state;
  }
};

const sizes = (
  state = INITIAL_STATE.sizes,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCT_SIZES_REQUEST:
      return {
        isLoading: {
          ...state.isLoading,
          [action.meta.productId]: true,
        },
        error: INITIAL_STATE.sizes.error,
      };
    case actionTypes.GET_PRODUCT_SIZES_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.meta.productId]: false,
        },
      };
    case actionTypes.GET_PRODUCT_SIZES_FAILURE:
      return {
        isLoading: {
          ...state.isLoading,
          [action.meta.productId]: undefined,
        },
        error: {
          ...state.error,
          [action.meta.productId]: action.payload.error,
        },
      };
    default:
      return state;
  }
};

// @TODO: Remove this reducer in version 2.0.0.
const sizeScale = (
  state = INITIAL_STATE.sizeScale,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.GET_SIZESCALE_REQUEST:
      return {
        isLoading: {
          ...state.isLoading,
          [action.payload.scaleId]: true,
        },
        error: INITIAL_STATE.sizeScale.error,
      };
    case actionTypes.GET_SIZESCALE_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.payload.scaleId]: false,
        },
      };
    case actionTypes.GET_SIZESCALE_FAILURE:
      return {
        isLoading: {
          ...state.isLoading,
          [action.payload.scaleId]: undefined,
        },
        error: {
          scaleId: action.payload.scaleId,
          message: action.payload.error,
        },
      };
    default:
      return state;
  }
};

const merchantsLocations = (
  state = INITIAL_STATE.merchantsLocations,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCT_MERCHANTS_LOCATIONS_REQUEST:
      return {
        isLoading: {
          ...state.isLoading,
          [action.meta.productId]: true,
        },
        error: INITIAL_STATE.merchantsLocations.error,
      };
    case actionTypes.GET_PRODUCT_MERCHANTS_LOCATIONS_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.meta.productId]: false,
        },
      };
    case actionTypes.GET_PRODUCT_MERCHANTS_LOCATIONS_FAILURE:
      return {
        isLoading: {
          ...state.isLoading,
          [action.meta.productId]: undefined,
        },
        error: {
          ...state.error,
          [action.meta.productId]: action.payload.error,
        },
      };
    default:
      return state;
  }
};

const grouping = (
  state = INITIAL_STATE.grouping,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCT_GROUPING_REQUEST:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.payload.productId]: true,
        },
        error: INITIAL_STATE.grouping.error,
      };
    case actionTypes.GET_PRODUCT_GROUPING_SUCCESS:
      return {
        ...state,
        currentPageIndex: {
          ...state.currentPageIndex,
          [action.payload.productId]: action.meta.number,
        },
        isLoading: {
          ...state.isLoading,
          [action.payload.productId]: false,
        },
      };
    case actionTypes.GET_PRODUCT_GROUPING_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.payload.productId]: undefined,
        },
        error: {
          ...state.error,
          [action.payload.productId]: action.payload.error,
        },
      };
    default:
      return state;
  }
};

const groupingProperties = (
  state = INITIAL_STATE.groupingProperties,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCT_GROUPING_PROPERTIES_REQUEST:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.payload.productId]: true,
        },
        error: INITIAL_STATE.groupingProperties.error,
      };
    case actionTypes.GET_PRODUCT_GROUPING_PROPERTIES_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.payload.productId]: false,
        },
      };
    case actionTypes.GET_PRODUCT_GROUPING_PROPERTIES_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.payload.productId]: undefined,
        },
        error: {
          ...state.error,
          [action.payload.productId]: action.payload.error,
        },
      };
    default:
      return state;
  }
};

export const entitiesMapper = {
  // The motivation for this was some data mismatch:
  // the `/api/products{id}/variantsMeasurements`
  // endpoint returns something different
  // from the details result (which is what we want).
  // However, if the response is an empty array,
  // `normalizr` seems to do nothing to the store.
  // I think this issue:
  // https://github.com/paularmstrong/normalizr/issues/290
  // portraits the problem as well.
  [actionTypes.GET_MEASUREMENTS_SUCCESS]: (
    state,
    { payload: { entities, productId } },
  ) => {
    const newMeasurements = entities.products[productId].measurements;
    const newState = createMergedObject(state, entities);

    newState.products[productId].measurements = newMeasurements;

    return newState;
  },
  [actionTypes.RESET_DETAILS_ENTITIES]: state => {
    const {
      products,
      recommendedSets,
      recommendedSetsWithOutOfStock,
      sets,
      ...rest
    } = state;

    return rest;
  },
};

export const getError = state => state.error;
export const getId = state => state.id;
export const getIsHydrated = state => state.isHydrated;
export const getIsLoading = state => state.isLoading;
// Attributes
export const getAttributesError = state => state.attributes.error;
export const getAreAttributesLoading = state => state.attributes.isLoading;
// Color grouping
export const getColorGroupingError = state => state.colorGrouping.error;
export const getIsColorGroupingLoading = state => state.colorGrouping.isLoading;
export const getColorGroupingCurrentPageIndex = state =>
  state.colorGrouping.currentPageIndex;
// Grouping
export const getGroupingError = state => state.grouping.error;
export const getIsGroupingLoading = state => state.grouping.isLoading;
export const getGroupingCurrentPageIndex = state =>
  state.grouping.currentPageIndex;
// Grouping Properties
export const getGroupingPropertiesError = state =>
  state.groupingProperties.error;
export const getIsGroupingPropertiesLoading = state =>
  state.groupingProperties.isLoading;
// Fittings
export const getFittingsError = state => state.fittings.error;
export const getAreFittingsLoading = state => state.fittings.isLoading;
// Measurements
export const getMeasurementsError = state => state.measurements.error;
export const getAreMeasurementsLoading = state => state.measurements.isLoading;
// Recommended sets
export const getRecommendedSetError = state => state.recommendedSets.error;
export const getRecommendedSetIsLoading = state =>
  state.recommendedSets.isLoading;
// Recommended sets with out of stock
export const getRecommendedSetWithOutOfStockError = state =>
  state.recommendedSetsWithOutOfStock.error;
export const getRecommendedSetWithOutOfStockIsLoading = state =>
  state.recommendedSetsWithOutOfStock.isLoading;
// Sets
export const getSetError = state => state.sets.error;
export const getSetIsLoading = state => state.sets.isLoading;
// Sizeguides
export const getSizeguidesError = state => state.sizeguides.error;
export const getAreSizeguidesLoading = state => state.sizeguides.isLoading;
// Sizes
export const getSizesError = state => state.sizes.error;
export const getAreSizesLoading = state => state.sizes.isLoading;
// Sizescale
export const getSizeScaleError = state => state.sizeScale.error;
export const getSizeScaleIsLoading = state => state.sizeScale.isLoading;
// Merchants Locations
export const getMerchantsLocationsError = state =>
  state.merchantsLocations.error;
export const getMerchantsLocationsIsLoading = state =>
  state.merchantsLocations.isLoading;

const reducers = combineReducers({
  attributes,
  colorGrouping,
  error,
  fittings,
  grouping,
  groupingProperties,
  id,
  isHydrated,
  isLoading,
  measurements,
  merchantsLocations,
  recommendedSets: recommendedSetsReducer,
  recommendedSetsWithOutOfStock,
  sets,
  sizeguides,
  sizes,
  sizeScale,
});

/**
 * Reducer for products details state.
 *
 * @function productsDetailsReducer
 * @static
 *
 * @param {object} state - Current redux state.
 * @param {object} action - Action dispatched.
 *
 * @returns {object} New state.
 */
export default (state, action = {}) => {
  if (action.type === actionTypes.RESET_DETAILS_STATE) {
    return reducers(INITIAL_STATE, action);
  }

  return reducers(state, action);
};
