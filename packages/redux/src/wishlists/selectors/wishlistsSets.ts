import * as fromWishlistSetsReducer from '../reducer/wishlistsSets';
import { createSelector } from 'reselect';
import { getEntities, getEntityById } from '../../entities/selectors';
import type { Error } from '@farfetch/blackout-client/types';
import type { SetsState } from '../types';
import type { StoreState } from '../../types';
import type { WishlistSet } from '@farfetch/blackout-client/wishlists/types';
import type { WishlistSetEntity } from '../../entities/types';
import type {
  WishlistSetHydrated,
  WishlistSetsErrors,
  WishlistSetsHydrated,
} from './types/wishlistsSets.types';

/**
 * Retrieves the error state of the current user's wishlist sets.
 *
 * @function
 * @memberof module:wishlists/selectors
 *
 * @param {object} state - Application state.
 *
 * @returns {object|undefined} Error information, `undefined` if there are no
 * errors.
 *
 * @example
 * import { getWishlistSetsError } from '@farfetch/blackout-redux/wishlists';
 *
 * const mapStateToProps = state => ({
 *     setsError: getWishlistSetsError(state)
 * });
 */
export const getWishlistSetsError = (
  state: StoreState,
): SetsState['error'] | undefined =>
  fromWishlistSetsReducer.getError(state.wishlist.sets) || undefined;

/**
 * Retrieves the ids of the wishlist sets for the current wishlist.
 *
 * @function
 * @memberof module:wishlists/selectors
 *
 * @param {object} state - Application state.
 *
 * @returns {Array|undefined} Ids of the wishlist sets for the current
 * wishlist.
 *
 * @example
 * import { getWishlistSetsIds } from '@farfetch/blackout-redux/wishlists';
 *
 * const mapStateToProps = state => ({
 *     wishlistSetsIds: getWishlistSetsIds(state)
 * });
 */
export const getWishlistSetsIds = (
  state: StoreState,
): SetsState['ids'] | undefined =>
  fromWishlistSetsReducer.getIds(state.wishlist.sets) || undefined;

/**
 * Retrieves the loading status of the wishlist sets.
 *
 * This status is affected by the loading of the wishlist sets themselves,
 * as well as any "add" operation.
 *
 * @function
 * @memberof module:wishlists/selectors
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Loading status of the wishlist sets.
 *
 * @example
 * import { areWishlistSetsLoading } from '@farfetch/blackout-redux/wishlists';
 *
 * const mapStateToProps = state => ({
 *     areWishlistSetsLoading: areWishlistSetsLoading(state)
 * });
 */
export const areWishlistSetsLoading = (
  state: StoreState,
): SetsState['isLoading'] =>
  fromWishlistSetsReducer.getIsLoading(state.wishlist.sets);

/**
 * Retrieves the error state of a specific wishlist set by its id.
 *
 * @function
 * @memberof module:wishlists/selectors
 *
 * @param {object} state - Application state.
 * @param {string} setId - Global identifier of the set in the wishlist.
 *
 * @returns {object|undefined} Error information, `undefined` if there are no
 * errors.
 *
 * @example
 * import { getWishlistSetError } from '@farfetch/blackout-redux/wishlists';
 *
 * const mapStateToProps = (state, { wishlistSet: { id } }) => ({
 *     error: getWishlistSetError(state, id)
 * });
 */
export const getWishlistSetError = (
  state: StoreState,
  setId: WishlistSet['setId'],
): Error | null | undefined =>
  fromWishlistSetsReducer.getSetError(state.wishlist.sets)[setId];

/**
 * Retrieves the loading status of a specific wishlist set by its id.
 *
 * @function
 * @memberof module:wishlists/selectors
 *
 * @param {object} state - Application state.
 * @param {string} setId - Global identifier of the set in the wishlist.
 *
 * @returns {boolean|undefined} Whether the given wishlist set is loading.
 *
 * @example
 * import { isWishlistSetLoading } from '@farfetch/blackout-redux/wishlists';
 *
 * const mapStateToProps = (state, { wishlistSet: { id } }) => ({
 *     isLoading: isWishlistSetLoading(state, id)
 * });
 */
export const isWishlistSetLoading = (
  state: StoreState,
  setId: WishlistSet['setId'],
): boolean | undefined =>
  fromWishlistSetsReducer.getIsSetLoading(state.wishlist.sets)[setId];

/**
 * Returns the fetched status of a specific wishlist set.
 *
 * @memberof module:wishlists/selectors
 *
 * @param {object} state - Application state.
 * @param {string} setId - Global identifier of the set in the wishlist.
 *
 * @returns {boolean} If a certain set has been fetched or not.
 */
export const isWishlistSetFetched = (
  state: StoreState,
  setId: WishlistSet['setId'],
): boolean | undefined =>
  fromWishlistSetsReducer
    .getIsSetLoading(state.wishlist.sets)
    .hasOwnProperty(setId) && isWishlistSetLoading(state, setId) === false;

/**
 * Retrieves a specific wishlist set by its id, with all properties populated
 * (ie, the wishlist item and product).
 *
 * @function
 * @memberof module:wishlists/selectors
 *
 * @param {object} state - Application state.
 * @param {string} setId - Global identifier of the set in the wishlist.
 *
 * @returns {object} Wishlist set entity for the given id.
 *
 * @example
 * import { getWishlistSet } from '@farfetch/blackout-redux/wishlists';
 *
 * const mapStateToProps = (state, { wishlistSet: { id } }) => ({
 *     wishlistSet: getWishlistSet(state, id)
 * });
 */
export const getWishlistSet = createSelector(
  [
    (state: StoreState) => getEntities(state, 'wishlistItems'),
    (state: StoreState, setId: WishlistSet['setId']) =>
      getEntityById(state, 'wishlistSets', setId) as WishlistSetEntity,
    (state: StoreState) => getEntities(state, 'products'),
  ],
  (wishlistItems, wishlistSet, products) => {
    if (!wishlistSet) {
      return;
    }

    const wishlistSetItems =
      wishlistSet?.wishlistSetItems?.map(setItem => {
        const wishlistItemProductId =
          wishlistItems?.[setItem.wishlistItemId]?.product;

        return {
          ...setItem,
          ...wishlistItems?.[setItem.wishlistItemId],
          product: wishlistItemProductId && products?.[wishlistItemProductId],
        };
      }) || [];

    return {
      ...wishlistSet,
      wishlistSetItems,
    } as WishlistSetHydrated;
  },
);

/**
 * Retrieves current user's wishlist sets, hydrated.
 *
 * @function
 * @memberof module:wishlists/selectors
 *
 * @param {object} state - Application state.
 *
 * @returns {Array | undefined} List of wishlist sets.
 *
 * @example
 * import { getWishlistSets } from '@farfetch/blackout-redux/wishlists';
 *
 * const mapStateToProps = state => ({
 *     wishlistSets: getWishlistSets(state)
 * });
 */
export const getWishlistSets = createSelector(
  [getWishlistSetsIds, state => state],
  (wishlistSetsIds, state) =>
    wishlistSetsIds?.map(setId =>
      getWishlistSet(state, setId),
    ) as WishlistSetsHydrated,
);

/**
 * Retrieves the number of different items in the wishlist set, regardless of
 * each one's quantity.
 *
 * @function
 * @memberof module:wishlists/selectors
 *
 * @param {object} state - Application state.
 * @param {string} setId - Global identifier of the set in the wishlist.
 *
 * @returns {number} Count of the items in the wishlist set.
 *
 * @example
 * import { getWishlistSetItemsCounter } from '@farfetch/blackout-redux/wishlists';
 *
 * const mapStateToProps = state => ({
 *     wishlistSetItemsCounter: getWishlistSetItemsCounter(state),
 * });
 */
export const getWishlistSetItemsCounter = (
  state: StoreState,
  setId: WishlistSet['setId'],
): number => {
  const wishlistSet = getEntityById(
    state,
    'wishlistSets',
    setId,
  ) as WishlistSetEntity;

  if (!setId || !wishlistSet || wishlistSet.wishlistSetItems.length === 0) {
    return 0;
  }

  return wishlistSet.wishlistSetItems.length;
};

/**
 * Retrieves the total quantity of products in the give wishlist set,
 * accounting with each item's quantity.
 *
 * @function
 * @memberof module:wishlists/selectors
 *
 * @param {object} state - Application state.
 * @param {string} setId - Global identifier of the set in the wishlist.
 *
 * @returns {number} Total quantity of products in the wishlist set.
 *
 * @example
 * import { getWishlistSetTotalQuantity } from '@farfetch/blackout-redux/wishlists';
 *
 * const mapStateToProps = state => ({
 *     wishlistSetTotalQuantity: getWishlistSetTotalQuantity(state),
 * });
 */
export const getWishlistSetTotalQuantity = (
  state: StoreState,
  setId: WishlistSet['setId'],
): number => {
  const wishlistSet = getWishlistSet(state, setId);

  if (!wishlistSet || wishlistSet.wishlistSetItems.length === 0) {
    return 0;
  }

  return wishlistSet.wishlistSetItems.reduce(
    (acc, wishlistItem) => acc + (wishlistItem?.quantity || 0),
    0,
  );
};

/**
 * Checks if either the root or any wishlist set is loading.
 * This is useful when handling multiple wishlist sets at the same time,
 * for example when adding a product to several wishlist sets.
 *
 * @function
 * @memberof module:wishlists/selectors
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Whether something is loading within wishlist sets.
 *
 * @example
 * import { isAnyWishlistSetLoading } from '@farfetch/blackout-redux/wishlists';
 *
 * const mapStateToProps = state => ({
 *     isAnyWishlistSetLoading: isAnyWishlistSetLoading(state),
 * });
 */
export const isAnyWishlistSetLoading = (state: StoreState): boolean => {
  const wishlistSetsIds = getWishlistSetsIds(state) || [];

  return (
    !!areWishlistSetsLoading(state) ||
    wishlistSetsIds.some(id => isWishlistSetLoading(state, id))
  );
};

/**
 * Checks if is something in the wishlist sets has errors, being it the root's
 * error or any set in particular.
 * This is useful when handling multiple wishlist sets at the same time,
 * for example when adding a product to several wishlist sets.
 *
 * @function
 * @memberof module:wishlists/selectors
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Whether something errored within wishlist sets.
 *
 * @example
 * import { areWishlistSetsWithAnyError } from '@farfetch/blackout-redux/wishlists';
 *
 * const mapStateToProps = state => ({
 *     areWishlistSetsWithAnyError: areWishlistSetsWithAnyError(state),
 * });
 */
export const areWishlistSetsWithAnyError = (state: StoreState): boolean => {
  const wishlistSetsIds = getWishlistSetsIds(state) || [];

  return (
    !!getWishlistSetsError(state) ||
    wishlistSetsIds.some(id => getWishlistSetError(state, id))
  );
};

/**
 * Gets all errors that occurred for each wishlist set, with the information
 * about the actual error and the respective wishlist set id and name.
 * This is useful when handling multiple wishlist sets at the same time,
 * for example when adding a product to several wishlist sets and some
 * of them fail. This allows retrieving each failed error and display which
 * sets had problems, for example.
 *
 * @function
 * @memberof module:wishlists/selectors
 *
 * @param {object} state - Application state.
 *
 * @returns {Array|undefined} Errors that occurred for a specific wishlist set,
 * with the "id", "name" and "error" information. Undefined if there are no
 * errors.
 *
 * @example
 * import { getAllWishlistSetsErrors } from '@farfetch/blackout-redux/wishlists';
 *
 * const mapStateToProps = state => ({
 *     allWishlistSetsErrors: getAllWishlistSetsErrors(state),
 * });
 */
export const getAllWishlistSetsErrors = createSelector(
  [
    getWishlistSetsIds,
    state => fromWishlistSetsReducer.getSetError(state.wishlist.sets),
    state => getEntities(state, 'wishlistSets'),
  ],
  (wishlistSetsIds, wishlistSetsErrors, wishlistSets) => {
    const errors: WishlistSetsErrors = [];

    wishlistSetsIds?.forEach(id => {
      const error = wishlistSetsErrors[id];

      if (error) {
        errors.push({
          id,
          name: wishlistSets?.[id]?.name,
          error,
        });
      }
    });

    return errors.length ? errors : undefined;
  },
);
