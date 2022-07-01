import * as fromWishlistSetsReducer from '../reducer/wishlistsSets';
import { createSelector } from 'reselect';
import { getEntities, getEntityById } from '../../entities/selectors';
import type { StoreState } from '../../types';
import type { WishlistSet } from '@farfetch/blackout-client';
import type {
  WishlistSetEntity,
  WishlistSetHydrated,
  WishlistSetsHydrated,
} from '../../entities/types';
import type { WishlistSetsErrors } from './types/wishlistsSets.types';
import type { WishlistsState } from '../types';

/**
 * Retrieves the error state of the current user's wishlist sets.
 *
 * @example
 * ```
 * import { getWishlistSetsError } from '@farfetch/blackout-redux/wishlists';
 *
 * const mapStateToProps = state => ({
 *     setsError: getWishlistSetsError(state)
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns Error information, `undefined` if there are no errors.
 */
export const getWishlistSetsError = (state: StoreState) =>
  fromWishlistSetsReducer.getError((state.wishlist as WishlistsState).sets) ||
  undefined;

/**
 * Retrieves the ids of the wishlist sets for the current wishlist.
 *
 * @example
 * ```
 * import { getWishlistSetsIds } from '@farfetch/blackout-redux/wishlists';
 *
 * const mapStateToProps = state => ({
 *     wishlistSetsIds: getWishlistSetsIds(state)
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns Ids of the wishlist sets for the current wishlist.
 */
export const getWishlistSetsIds = (state: StoreState) =>
  fromWishlistSetsReducer.getIds((state.wishlist as WishlistsState).sets) ||
  undefined;

/**
 * Retrieves the loading status of the wishlist sets.
 *
 * This status is affected by the loading of the wishlist sets themselves, as well
 * as any "add" operation.
 *
 * @example
 * ```
 * import { areWishlistSetsLoading } from '@farfetch/blackout-redux/wishlists';
 *
 * const mapStateToProps = state => ({
 *     areWishlistSetsLoading: areWishlistSetsLoading(state)
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns Loading status of the wishlist sets.
 */
export const areWishlistSetsLoading = (state: StoreState) =>
  fromWishlistSetsReducer.getIsLoading((state.wishlist as WishlistsState).sets);

/**
 * Retrieves the error state of a specific wishlist set by its id.
 *
 * @example
 * ```
 * import { getWishlistSetError } from '@farfetch/blackout-redux/wishlists';
 *
 * const mapStateToProps = (state, { wishlistSet: { id } }) => ({
 *     error: getWishlistSetError(state, id)
 * });
 * ```
 *
 * @param state - Application state.
 * @param setId - Global identifier of the set in the wishlist.
 *
 * @returns Error information, `undefined` if there are no errors.
 */
export const getWishlistSetError = (
  state: StoreState,
  setId: WishlistSet['setId'],
) =>
  fromWishlistSetsReducer.getSetError((state.wishlist as WishlistsState).sets)[
    setId
  ];

/**
 * Retrieves the loading status of a specific wishlist set by its id.
 *
 * @example
 * ```
 * import { isWishlistSetLoading } from '@farfetch/blackout-redux/wishlists';
 *
 * const mapStateToProps = (state, { wishlistSet: { id } }) => ({
 *     isLoading: isWishlistSetLoading(state, id)
 * });
 * ```
 *
 * @param state - Application state.
 * @param setId - Global identifier of the set in the wishlist.
 *
 * @returns Whether the given wishlist set is loading.
 */
export const isWishlistSetLoading = (
  state: StoreState,
  setId: WishlistSet['setId'],
) =>
  fromWishlistSetsReducer.getIsSetLoading(
    (state.wishlist as WishlistsState).sets,
  )[setId];

/**
 * Returns the fetched status of a specific wishlist set.
 *
 * @param state - Application state.
 * @param setId - Global identifier of the set in the wishlist.
 *
 * @returns If a certain set has been fetched or not.
 */
export const isWishlistSetFetched = (
  state: StoreState,
  setId: WishlistSet['setId'],
) =>
  fromWishlistSetsReducer
    .getIsSetLoading((state.wishlist as WishlistsState).sets)
    .hasOwnProperty(setId) && isWishlistSetLoading(state, setId) === false;

/**
 * Retrieves a specific wishlist set by its id, with all properties populated (ie,
 * the wishlist item and product).
 *
 * @example
 * ```
 * import { getWishlistSet } from '@farfetch/blackout-redux/wishlists';
 *
 * const mapStateToProps = (state, { wishlistSet: { id } }) => ({
 *     wishlistSet: getWishlistSet(state, id)
 * });
 * ```
 *
 * @param state - Application state.
 * @param setId - Global identifier of the set in the wishlist.
 *
 * @returns Wishlist set entity for the given id.
 */
// Note: Apparently the type definition of the createSelector function
//       is not defined correctly in reselect package as it is not inferring
//       the additional parameter 'setId' provided in each selector, so
//       we need to type the returned selector ourselves instead of relying on
//       the inferred type.
export const getWishlistSet: (
  state: StoreState,
  setId: WishlistSet['setId'],
) => WishlistSetHydrated | undefined = createSelector(
  [
    (state: StoreState) => getEntities(state, 'wishlistItems'),
    (
      state: StoreState,
      setId: WishlistSet['setId'],
    ): WishlistSetEntity | undefined =>
      getEntityById(state, 'wishlistSets', setId),
    (state: StoreState) => getEntities(state, 'products'),
  ],
  (wishlistItems, wishlistSet, products) => {
    if (!wishlistSet) {
      return;
    }

    const wishlistSetItems =
      wishlistSet.wishlistSetItems?.map(setItem => {
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
 * @example
 * ```
 * import { getWishlistSets } from '@farfetch/blackout-redux/wishlists';
 *
 * const mapStateToProps = state => ({
 *     wishlistSets: getWishlistSets(state)
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns List of wishlist sets.
 */
export const getWishlistSets = createSelector(
  [getWishlistSetsIds, state => state],
  (wishlistSetsIds, state) =>
    wishlistSetsIds?.map(setId =>
      getWishlistSet(state, setId),
    ) as WishlistSetsHydrated,
);

/**
 * Retrieves the number of different items in the wishlist set, regardless of each
 * one's quantity.
 *
 * @example
 * ```
 * import { getWishlistSetItemsCounter } from '@farfetch/blackout-redux/wishlists';
 *
 * const mapStateToProps = state => ({
 *     wishlistSetItemsCounter: getWishlistSetItemsCounter(state),
 * });
 * ```
 *
 * @param state - Application state.
 * @param setId - Global identifier of the set in the wishlist.
 *
 * @returns Count of the items in the wishlist set.
 */
export const getWishlistSetItemsCounter = (
  state: StoreState,
  setId: WishlistSet['setId'],
): number => {
  const wishlistSet: WishlistSetEntity | undefined = getEntityById(
    state,
    'wishlistSets',
    setId,
  );

  if (!wishlistSet || wishlistSet.wishlistSetItems.length === 0) {
    return 0;
  }

  return wishlistSet.wishlistSetItems.length;
};

/**
 * Retrieves the total quantity of products in the give wishlist set, accounting
 * with each item's quantity.
 *
 * @example
 * ```
 * import { getWishlistSetTotalQuantity } from '@farfetch/blackout-redux/wishlists';
 *
 * const mapStateToProps = state => ({
 *     wishlistSetTotalQuantity: getWishlistSetTotalQuantity(state),
 * });
 * ```
 *
 * @param state - Application state.
 * @param setId - Global identifier of the set in the wishlist.
 *
 * @returns Total quantity of products in the wishlist set.
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
 * Checks if either the root or any wishlist set is loading. This is useful when
 * handling multiple wishlist sets at the same time, for example when adding a
 * product to several wishlist sets.
 *
 * @example
 * ```
 * import { isAnyWishlistSetLoading } from '@farfetch/blackout-redux/wishlists';
 *
 * const mapStateToProps = state => ({
 *     isAnyWishlistSetLoading: isAnyWishlistSetLoading(state),
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns Whether something is loading within wishlist sets.
 */
export const isAnyWishlistSetLoading = (state: StoreState) => {
  const wishlistSetsIds = getWishlistSetsIds(state) || [];

  return (
    !!areWishlistSetsLoading(state) ||
    wishlistSetsIds.some(id => isWishlistSetLoading(state, id))
  );
};

/**
 * Checks if is something in the wishlist sets has errors, being it the root's
 * error or any set in particular. This is useful when handling multiple wishlist
 * sets at the same time, for example when adding a product to several wishlist
 * sets.
 *
 * @example
 * ```
 * import { areWishlistSetsWithAnyError } from '@farfetch/blackout-redux/wishlists';
 *
 * const mapStateToProps = state => ({
 *     areWishlistSetsWithAnyError: areWishlistSetsWithAnyError(state),
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns Whether something errored within wishlist sets.
 */
export const areWishlistSetsWithAnyError = (state: StoreState) => {
  const wishlistSetsIds = getWishlistSetsIds(state) || [];

  return (
    !!getWishlistSetsError(state) ||
    wishlistSetsIds.some(id => getWishlistSetError(state, id))
  );
};

/**
 * Gets all errors that occurred for each wishlist set, with the information about
 * the actual error and the respective wishlist set id and name. This is useful
 * when handling multiple wishlist sets at the same time, for example when adding a
 * product to several wishlist sets and some of them fail. This allows retrieving
 * each failed error and display which sets had problems, for example.
 *
 * @example
 * ```
 * import { getAllWishlistSetsErrors } from '@farfetch/blackout-redux/wishlists';
 *
 * const mapStateToProps = state => ({
 *     allWishlistSetsErrors: getAllWishlistSetsErrors(state),
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns Errors that occurred for a specific wishlist set, with the "id", "name" and "error"
 * information. Undefined if there are no errors.
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
