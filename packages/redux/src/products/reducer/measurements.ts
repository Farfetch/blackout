import * as actionTypes from '../actionTypes/index.js';
import { type AnyAction, combineReducers, type Reducer } from 'redux';
import createMergedObject from '../../helpers/createMergedObject.js';
import type { ProductEntity } from '../../entities/index.js';
import type { ProductsMeasurementsState } from '../types/index.js';
import type { StoreState } from '../../types/index.js';

export const INITIAL_STATE: ProductsMeasurementsState = {
  error: {},
  isLoading: {},
};

const error = (state = INITIAL_STATE.error, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCT_MEASUREMENTS_REQUEST:
      return {
        ...state,
        [action.meta.productId]: undefined,
      };
    case actionTypes.FETCH_PRODUCT_MEASUREMENTS_FAILURE:
      return {
        ...state,
        [action.meta.productId]: action.payload.error,
      };
    default:
      return state;
  }
};

const isLoading = (state = INITIAL_STATE.isLoading, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCT_MEASUREMENTS_REQUEST:
      return {
        ...state,
        [action.meta.productId]: true,
      };
    case actionTypes.FETCH_PRODUCT_MEASUREMENTS_SUCCESS:
    case actionTypes.FETCH_PRODUCT_MEASUREMENTS_FAILURE:
      return { ...state, [action.meta.productId]: false };
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
  [actionTypes.FETCH_PRODUCT_MEASUREMENTS_SUCCESS]: (
    state: NonNullable<StoreState['entities']>,
    { meta: { productId }, payload: { entities } }: AnyAction,
  ) => {
    if (!state) {
      return state;
    }

    const newMeasurements = entities.products[productId]?.measurements;
    const newState = createMergedObject(state, entities);
    const productEntity = (
      newState.products as Record<ProductEntity['id'], ProductEntity>
    )[productId as ProductEntity['id']];

    if (productEntity) {
      productEntity.measurements = newMeasurements;
    }

    return newState;
  },
};

export const getError = (
  state: ProductsMeasurementsState,
): ProductsMeasurementsState['error'] => state.error;
export const getIsLoading = (
  state: ProductsMeasurementsState,
): ProductsMeasurementsState['isLoading'] => state.isLoading;

/**
 * Reducer for products measurements.
 *
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */
const productsMeasurementsReducer: Reducer<ProductsMeasurementsState> =
  combineReducers({
    error,
    isLoading,
  });

export default productsMeasurementsReducer;
