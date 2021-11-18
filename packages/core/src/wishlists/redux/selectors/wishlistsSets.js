import * as fromWishlistSetsReducer from '../reducer/wishlistsSets';
import { createSelector } from 'reselect';
import { getEntity } from '../../../entities/redux/selectors';

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
 * import { getWishlistSetsError } from '@farfetch/blackout-core/wishlists/redux';
 *
 * const mapStateToProps = state => ({
 *     setsError: getWishlistSetsError(state)
 * });
 */
export const getWishlistSetsError = state =>
  fromWishlistSetsReducer.getError(state.wishlist.wishlistSets) || undefined;

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
 * import { getWishlistSetsIds } from '@farfetch/blackout-core/wishlists/redux';
 *
 * const mapStateToProps = state => ({
 *     wishlistSetsIds: getWishlistSetsIds(state)
 * });
 */
export const getWishlistSetsIds = state =>
  fromWishlistSetsReducer.getIds(state.wishlist.wishlistSets) || undefined;

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
 * import { areWishlistSetsLoading } from '@farfetch/blackout-core/wishlists/redux';
 *
 * const mapStateToProps = state => ({
 *     areWishlistSetsLoading: areWishlistSetsLoading(state)
 * });
 */
export const areWishlistSetsLoading = state =>
  fromWishlistSetsReducer.getIsLoading(state.wishlist.wishlistSets);

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
 * import { getWishlistSetError } from '@farfetch/blackout-core/wishlists/redux';
 *
 * const mapStateToProps = (state, { wishlistSet: { id } }) => ({
 *     error: getWishlistSetError(state, id)
 * });
 */
export const getWishlistSetError = (state, setId) =>
  fromWishlistSetsReducer.getSetError(state.wishlist.wishlistSets)[setId];

/**
 * Retrieves the loading status of a specific wishlist set by its id.
 *
 * @function
 * @memberof module:wishlists/selectors
 *
 * @param {object} state - Application state.
 * @param {string} setId - Global identifier of the set in the wishlist.
 *
 * @returns {boolean} Whether the given wishlist set is loading.
 *
 * @example
 * import { isWishlistSetLoading } from '@farfetch/blackout-core/wishlists/redux';
 *
 * const mapStateToProps = (state, { wishlistSet: { id } }) => ({
 *     isLoading: isWishlistSetLoading(state, id)
 * });
 */
export const isWishlistSetLoading = (state, setId) =>
  fromWishlistSetsReducer.getIsSetLoading(state.wishlist.wishlistSets)[setId];

/**
 * Retrieves current user's wishlist sets.
 *
 * @function
 * @memberof module:wishlists/selectors
 *
 * @param {object} state - Application state.
 *
 * @returns {Array} List of wishlist sets.
 *
 * @example
 * import { getWishlistSets } from '@farfetch/blackout-core/wishlists/redux';
 *
 * const mapStateToProps = state => ({
 *     wishlistSets: getWishlistSets(state)
 * });
 */
export const getWishlistSets = createSelector(
  [
    state => getEntity(state, 'wishlistSets'),
    getWishlistSetsIds,
    state => getEntity(state, 'wishlistItems'),
    state => getEntity(state, 'products'),
  ],
  (wishlistSets, wishlistSetsIds, wishlistItems, products) =>
    wishlistSetsIds?.map(id => {
      const wishlistSet = wishlistSets[id];

      const wishlistSetItems =
        wishlistSet?.wishlistSetItems?.map(setItem => ({
          ...setItem,
          ...wishlistItems?.[setItem.wishlistItemId],
          product: products?.[wishlistItems?.[setItem.wishlistItemId]?.product],
        })) || [];

      return {
        ...wishlistSet,
        wishlistSetItems,
      };
    }),
);

/**
 * Retrieves a specific wishlist set by its id, with all proprerties populated
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
 * import { getWishlistSet } from '@farfetch/blackout-core/wishlists/redux';
 *
 * const mapStateToProps = (state, { wishlistSet: { id } }) => ({
 *     wishlistSet: getWishlistSet(state, id)
 * });
 */
export const getWishlistSet = createSelector(
  [
    state => getEntity(state, 'wishlistItems'),
    (state, setId) => getEntity(state, 'wishlistSets', setId),
    state => getEntity(state, 'products'),
  ],
  (wishlistItems, wishlistSet, products) => {
    if (!wishlistSet) {
      return;
    }

    const wishlistSetItems =
      wishlistSet?.wishlistSetItems?.map(setItem => ({
        ...setItem,
        ...wishlistItems?.[setItem.wishlistItemId],
        product: products?.[wishlistItems?.[setItem.wishlistItemId]?.product],
      })) || [];

    return {
      ...wishlistSet,
      wishlistSetItems,
    };
  },
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
 * import { getWishlistSetItemsCounter } from '@farfetch/blackout-core/wishlists/redux';
 *
 * const mapStateToProps = state => ({
 *     wishlistSetItemsCounter: getWishlistSetItemsCounter(state),
 * });
 */
export const getWishlistSetItemsCounter = (state, setId) => {
  const wishlistSet = getEntity(state, 'wishlistSets', setId);

  if (!wishlistSet || wishlistSet.wishlistSetItems.length === 0) {
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
 * import { getWishlistSetTotalQuantity } from '@farfetch/blackout-core/wishlists/redux';
 *
 * const mapStateToProps = state => ({
 *     wishlistSetTotalQuantity: getWishlistSetTotalQuantity(state),
 * });
 */
export const getWishlistSetTotalQuantity = (state, setId) => {
  const wishlistSet = getWishlistSet(state, setId);

  if (!wishlistSet || wishlistSet.wishlistSetItems.length === 0) {
    return 0;
  }

  return wishlistSet.wishlistSetItems.reduce(
    (acc, wishlistItem) => acc + wishlistItem.quantity,
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
 * import { isAnyWishlistSetLoading } from '@farfetch/blackout-core/wishlists/redux';
 *
 * const mapStateToProps = state => ({
 *     isAnyWishlistSetLoading: isAnyWishlistSetLoading(state),
 * });
 */
export const isAnyWishlistSetLoading = state => {
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
 * import { areWishlistSetsWithAnyError } from '@farfetch/blackout-core/wishlists/redux';
 *
 * const mapStateToProps = state => ({
 *     areWishlistSetsWithAnyError: areWishlistSetsWithAnyError(state),
 * });
 */
export const areWishlistSetsWithAnyError = state => {
  const wishlistSetsIds = getWishlistSetsIds(state) || [];

  return (
    !!getWishlistSetsError(state) ||
    wishlistSetsIds.some(id => getWishlistSetError(state, id))
  );
};

/**
 * Gets all errors that occured for each wishlist set, with the information
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
 * @returns {Array|undefined} Errors that occured for a specific wishlist set,
 * with the "id", "name" and "error" information. Undefined if there are no
 * errors.
 *
 * @example
 * import { getAllWishlistSetsErrors } from '@farfetch/blackout-core/wishlists/redux';
 *
 * const mapStateToProps = state => ({
 *     allWishlistSetsErrors: getAllWishlistSetsErrors(state),
 * });
 */
export const getAllWishlistSetsErrors = createSelector(
  [
    getWishlistSetsIds,
    state => fromWishlistSetsReducer.getSetError(state.wishlist.wishlistSets),
    state => getEntity(state, 'wishlistSets'),
  ],
  (wishlistSetsIds, wishlistSetsErrors, wishlistSets) => {
    const errors = [];

    /* eslint-disable-next-line no-unused-expressions*/
    wishlistSetsIds?.forEach(id => {
      const error = wishlistSetsErrors[id];

      if (error) {
        errors.push({
          id,
          name: wishlistSets[id].name,
          error,
        });
      }
    });

    return errors.length ? errors : undefined;
  },
);
