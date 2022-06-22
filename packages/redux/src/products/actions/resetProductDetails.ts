import * as actionTypes from '../actionTypes';
import { resetProductDetailsState } from './resetProductDetailsState';
import type {
  ResetProductDetailsEntitiesAction,
  ResetProductDetailsStateAction,
} from '../types';
import type { StoreState } from '../../types';
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
  () =>
  (
    dispatch: ThunkDispatch<
      StoreState,
      unknown,
      ResetProductDetailsEntitiesAction
    >,
  ): void => {
    dispatch({
      type: actionTypes.RESET_PRODUCT_DETAILS_ENTITIES,
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
export const resetProductDetails =
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
