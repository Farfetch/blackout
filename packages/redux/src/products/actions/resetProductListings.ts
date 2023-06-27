import * as actionTypes from '../actionTypes/index.js';
import type { Dispatch } from 'redux';
import type {
  ResetProductListingFacetsAction,
  ResetProductListsEntitiesAction,
  ResetProductListsStateAction,
} from '../types/index.js';
import type { StoreState } from '../../types/index.js';
import type { ThunkDispatch } from 'redux-thunk';

/**
 * Reset product listings related entities to its initial value.
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
const resetProductListingsEntities =
  (productsListsHashes?: Array<string>) =>
  (
    dispatch: ThunkDispatch<
      StoreState,
      unknown,
      ResetProductListsEntitiesAction
    >,
  ): void => {
    dispatch({
      type: actionTypes.RESET_PRODUCT_LISTING_ENTITIES,
      payload: productsListsHashes,
    });
  };

/**
 * Reset products listings state to its initial value.
 *
 * @example
 * ```
 *
 * // State before executing action
 * const state = {
 *     hash: '123-foo',
 *     error: {'123-foo': 'Error'},
 *     isLoading: {'123-foo': false},
 *     ...
 * };
 *
 * // Result of reset:
 * const state =  { hash: null, error: {}, isLoading: {}, isHydrated: {} }
 *
 * // Usage
 * dispatch(resetProductListings());
 *
 * ```
 *
 * @returns Dispatch reset product listings state action.
 */
const resetProductListingsState =
  (productsListsHashes?: Array<string>) =>
  (dispatch: Dispatch<ResetProductListsStateAction>): void => {
    dispatch({
      type: actionTypes.RESET_PRODUCT_LISTINGS_STATE,
      payload: productsListsHashes,
    });
  };

const resetProductListingFacets =
  () =>
  (dispatch: Dispatch<ResetProductListingFacetsAction>): void => {
    dispatch({
      type: actionTypes.RESET_PRODUCT_LISTING_FACETS,
    });
  };

/**
 * Reset product listings state and related entities to its initial value.
 *
 * @example
 * ```
 * import { resetProductListings } from '@farfetch/blackout-redux';
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
 * // Result of resetProductListings:
 * const state =  { hash: null, error: {}, isLoading: {}, isHydrated: {} }
 * const store = { entities: { products: { 123: {...} } } }
 *
 * // Usage
 * dispatch(resetProductListings());
 *
 * ```
 *
 * @returns Dispatch reset product listings state and entities action.
 */
const resetProductListings =
  (productListingsHashes?: Array<string>) =>
  (
    dispatch: ThunkDispatch<
      StoreState,
      unknown,
      ResetProductListsStateAction | ResetProductListsEntitiesAction
    >,
  ): void => {
    dispatch(resetProductListingsState(productListingsHashes));
    dispatch(resetProductListingsEntities(productListingsHashes));
    dispatch(resetProductListingFacets());
  };

export default resetProductListings;
