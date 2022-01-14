/**
 * Hook to provide all kinds of data for the business logic attached to the wishlists.
 *
 * @module useWishlist
 * @category Wishlists
 * @subcategory Hooks
 */
import {
  addWishlistItem as addWishlistItemAction,
  fetchWishlist as fetchWishlistAction,
  getWishlist,
  getWishlistError,
  getWishlistId,
  getWishlistItems,
  getWishlistItemsCounter,
  getWishlistTotalQuantity,
  isWishlistLoading as isWishlistLoadingSelector,
  resetWishlist as resetWishlistAction,
  resetWishlistState as resetWishlistStateAction,
} from '@farfetch/blackout-redux/wishlists';
import { useAction } from '../../helpers';
import { useSelector } from 'react-redux';
import type { UseWishlist } from './types';

/**
 * Provides Redux actions and state access, as well as handlers for dealing with
 * wishlist business logic.
 *
 * @memberof module:wishlists/hooks
 *
 * @returns {object} All the handlers, state, actions and relevant data needed
 * to manage any wishlist operation.
 */
const useWishlist: UseWishlist = () => {
  // Selectors
  const error = useSelector(getWishlistError);
  const id = useSelector(getWishlistId);
  const isWishlistLoading = useSelector(isWishlistLoadingSelector);
  const itemCount = useSelector(getWishlistItemsCounter);
  const items = useSelector(getWishlistItems);
  const itemsWithSetsInfo = useSelector(state => getWishlistItems(state, true));
  const totalQuantity = useSelector(getWishlistTotalQuantity);
  const wishlist = useSelector(getWishlist);
  // Actions
  const addWishlistItem = useAction(addWishlistItemAction);
  const fetchWishlist = useAction(fetchWishlistAction);
  const resetWishlist = useAction(resetWishlistAction);
  const resetWishlistState = useAction(resetWishlistStateAction);
  // Data with some logic
  const isEmpty = totalQuantity === 0;
  // If there is no wishlist and there is no error (with `isWishlistLoading === false`),
  // it means the wishlist hasn't started fetching, so it's considered loading
  const isLoading = (!wishlist && !error) || isWishlistLoading;

  return {
    /**
     * Add item to wishlist.
     *
     * @type {Function}
     */
    addWishlistItem,
    /**
     * Error state of the fetched wishlist.
     *
     * @type {object|undefined}
     */
    error,
    /**
     * Fetches the wishlist.
     *
     * @type {Function}
     */
    fetchWishlist,
    /**
     * Identifier of the fetched wishlist.
     *
     * @type {object}
     */
    id,
    /**
     * Whether the wishlist is empty, ie, with no items.
     *
     * @type {boolean}
     */
    isEmpty,
    /**
     * Whether the wishlist is loading.
     *
     * @type {boolean}
     */
    isLoading,
    /**
     * The number of different items in the wishlist, regardless of each one's quantity.
     *
     * @type {number}
     */
    itemCount,
    /**
     * Wishlist items of the fetched wishlist.
     *
     * @type {Array|undefined}
     */
    items,
    /**
     * Wishlist items of the fetched wishlist, with the respective parent wishlist set data.
     *
     * @type {Array|undefined}
     */
    itemsWithSetsInfo,
    /**
     * Resets the wishlist.
     *
     * @type {Function}
     */
    resetWishlist,
    /**
     * Resets the wishlist state.
     *
     * @type {Function}
     */
    resetWishlistState,
    /**
     * The total quantity of products in the current user's wishlist,
     * accounting with each item's quantity.
     *
     * @type {number}
     */
    totalQuantity,
    /**
     * Fetched wishlist data.
     *
     * @type {object}
     */
    wishlist,
  };
};

export default useWishlist;
