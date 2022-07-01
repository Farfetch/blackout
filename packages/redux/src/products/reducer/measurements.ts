import * as actionTypes from '../actionTypes';
import { AnyAction, combineReducers } from 'redux';
import createMergedObject from '../../helpers/createMergedObject';
import type {
  FetchProductMeasurementsAction,
  FetchProductMeasurementsFailureAction,
  FetchProductMeasurementsRequestAction,
  ProductsMeasurementsState,
} from '../types';
import type { StoreState } from '../../types';

export const INITIAL_STATE: ProductsMeasurementsState = {
  error: {},
  isLoading: {},
};

const error = (
  state = INITIAL_STATE.error,
  action:
    | FetchProductMeasurementsRequestAction
    | FetchProductMeasurementsFailureAction,
) => {
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

const isLoading = (
  state = INITIAL_STATE.isLoading,
  action: FetchProductMeasurementsAction | AnyAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCT_MEASUREMENTS_REQUEST:
      return {
        ...state,
        [action.meta.productId]: true,
      };
    case actionTypes.FETCH_PRODUCT_MEASUREMENTS_SUCCESS:
      return { ...state, [action.meta.productId]: false };
    case actionTypes.FETCH_PRODUCT_MEASUREMENTS_FAILURE:
      return { ...state, [action.meta.productId]: undefined };
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
  ): StoreState['entities'] => {
    if (!state) {
      return state;
    }

    const newMeasurements = entities.products[productId]?.measurements;
    const newState = createMergedObject(state, entities);

    newState.products[productId].measurements = newMeasurements;

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
const productsMeasurementsReducer = combineReducers({
  error,
  isLoading,
});

export default productsMeasurementsReducer;
