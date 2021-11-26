import { RESET_PRODUCT_DETAILS_ENTITIES } from '../actionTypes';
import resetProductDetailsState from './resetProductDetailsState';
import type {
  ResetProductDetailsEntitiesAction,
  ResetProductDetailsStateAction,
} from '../types';
import type { StoreState } from '../../types';
import type { ThunkDispatch } from 'redux-thunk';

/**
 * Reset details related entities to its initial value.
 *
 * @private
 * @memberof module:products/actions
 *
 * @name resetProductEntities
 *
 * @example
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
 * @returns {Function} Dispatch reset details entities action.
 */
const resetProductEntities =
  () =>
  (
    dispatch: ThunkDispatch<
      StoreState,
      unknown,
      ResetProductDetailsEntitiesAction
    >,
  ): void => {
    dispatch({
      type: RESET_PRODUCT_DETAILS_ENTITIES,
    });
  };

/**
 * Reset details state and related entities to its initial value.
 *
 * @memberof module:products/actions
 *
 * @name resetProductDetails
 *
 * @example
 * import { resetProductDetails } from '@farfetch/blackout-redux/products';
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
 * @returns {Function} Dispatch reset details state and entities action.
 */
const resetProductDetails =
  () =>
  (
    dispatch: ThunkDispatch<
      StoreState,
      unknown,
      ResetProductDetailsStateAction | ResetProductDetailsEntitiesAction
    >,
  ): void => {
    dispatch(resetProductDetailsState());
    dispatch(resetProductEntities());
  };

export default resetProductDetails;
