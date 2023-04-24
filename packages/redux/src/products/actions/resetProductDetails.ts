import * as actionTypes from '../actionTypes/index.js';
import type { Dispatch } from 'redux';
import type { ProductEntity } from '../../entities/types/index.js';
import type {
  ResetProductDetailsEntitiesAction,
  ResetProductDetailsStateAction,
} from '../types/index.js';
import type { StoreState } from '../../types/index.js';
import type { ThunkDispatch } from 'redux-thunk';

/**
 * Reset details related entities to its initial value.
 *
 * @example
 * ```
 * // Store before executing action
 * const store = {
 *     entities: {
 *         products: { 123: {...} }
 *     }
 * }
 *
 * // Result of reset entities:
 * const store = { entities: {} }
 *
 * ```
 *
 * @returns Dispatch reset details entities action.
 */
const resetProductEntities =
  (productIds?: Array<ProductEntity['id']>) =>
  (
    dispatch: ThunkDispatch<
      StoreState,
      unknown,
      ResetProductDetailsEntitiesAction
    >,
  ): void => {
    dispatch({
      type: actionTypes.RESET_PRODUCT_DETAILS_ENTITIES,
      payload: productIds,
    });
  };

/**
 * Reset details state to its initial value.
 *
 * @example
 * ```
 * import { resetProductDetailsState } from '@farfetch/blackout-redux';
 *
 * // State before executing action
 * const state = { id: '123', error: null, isLoading: false, isHydrated: ... };
 *
 * // Result of resetProductDetailsState
 * const state =  { id: null, error: null, isLoading: false, isHydrated: {} }
 *
 * // Usage
 * dispatch(resetProductDetailsState());
 *
 * ```
 *
 * @returns Dispatch reset details state action.
 */
const resetProductDetailsState =
  (productIds?: Array<ProductEntity['id']>) =>
  (dispatch: Dispatch<ResetProductDetailsStateAction>): void => {
    dispatch({
      type: actionTypes.RESET_PRODUCT_DETAILS_STATE,
      payload: productIds,
    });
  };

/**
 * Reset details state and related entities to its initial value.
 *
 * @example
 * ```
 * import { resetProductDetails } from '@farfetch/blackout-redux';
 *
 * // State and store before executing action
 * const state = { id: '123', error: null, isLoading: false, isHydrated: ... };
 * const store = {
 *     entities: {
 *         products: { 123: {...} }
 *     }
 * }
 *
 * // Result of reset:
 * const state =  { id: null, error: null, isLoading: false, isHydrated: {} }
 * const store = { entities: {} }
 *
 * // Usage
 * dispatch(resetProductDetails());
 *
 * ```
 *
 * @returns Dispatch reset details state and entities action.
 */
const resetProductDetails =
  (productIds?: Array<ProductEntity['id']>) =>
  (
    dispatch: ThunkDispatch<
      StoreState,
      unknown,
      ResetProductDetailsStateAction | ResetProductDetailsEntitiesAction
    >,
  ): void => {
    dispatch(resetProductDetailsState(productIds));
    dispatch(resetProductEntities(productIds));
  };

export default resetProductDetails;
