import * as actionTypes from '../actionTypes/index.js';
import resetProductsListsState from './resetProductsListsState.js';
import type {
  ResetProductsListsEntitiesAction,
  ResetProductsListsStateAction,
} from '../types/index.js';
import type { StoreState } from '../../types/index.js';
import type { ThunkDispatch } from 'redux-thunk';

/**
 * Reset products lists related entities to its initial value.
 *
 * @example
 * ```
 * // Store before executing action
 * const store = {
 *     entities: {
 *         products: { 123: {...} }
 *         productsLists: { '123-foo': {...} }
 *     }
 * }
 *
 * // Result of reset entities:
 * const store = { entities: { products: { 123: {...} } } }
 *
 * ```
 *
 * @returns Dispatch reset productsLists entities action.
 */
const resetProductsListsEntities =
  (productsListsHashes?: Array<string>) =>
  (
    dispatch: ThunkDispatch<
      StoreState,
      unknown,
      ResetProductsListsEntitiesAction
    >,
  ): void => {
    dispatch({
      type: actionTypes.RESET_PRODUCTS_LISTS_ENTITIES,
      payload: productsListsHashes,
    });
  };

/**
 * Reset products lists state and related entities to its initial value.
 *
 * @example
 * ```
 * import { resetProductsLists } from '@farfetch/blackout-redux';
 *
 * // State and store before executing action
 * const state = {
 *     hash: '123-foo',
 *     error: {'123-foo': 'Error'},
 *     isLoading: {'123-foo': false},
 *     ...
 * };
 * const store = {
 *     entities: {
 *         products: { 123: {...} }
 *         productsLists: { '123-foo': {...} }
 *     }
 * }
 *
 * // Result of resetProductsLists:
 * const state =  { hash: null, error: {}, isLoading: {}, isHydrated: {} }
 * const store = { entities: { products: { 123: {...} } } }
 *
 * // Usage
 * dispatch(resetProductsLists());
 *
 * ```
 *
 * @returns Dispatch reset products lists state and entities action.
 */
const resetProductsLists =
  (productsListsHashes?: Array<string>) =>
  (
    dispatch: ThunkDispatch<
      StoreState,
      unknown,
      ResetProductsListsStateAction | ResetProductsListsEntitiesAction
    >,
  ): void => {
    dispatch(resetProductsListsState(productsListsHashes));
    dispatch(resetProductsListsEntities(productsListsHashes));
  };

export default resetProductsLists;
