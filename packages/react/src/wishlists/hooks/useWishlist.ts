/**
 * Hook to provide all kinds of data for the business logic attached to the
 * wishlists.
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
} from '@farfetch/blackout-redux';
import { useAction } from '../../helpers';
import { useSelector } from 'react-redux';
import type { UseWishlist } from './types';

/**
 * Provides Redux actions and state access, as well as handlers for dealing with
 * wishlist business logic.
 *
 * @returns All the handlers, state, actions and relevant data needed to manage any wishlist operation.
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
     */
    addWishlistItem,
    /**
     * Error state of the fetched wishlist.
     */
    error,
    /**
     * Fetches the wishlist.
     */
    fetchWishlist,
    /**
     * Identifier of the fetched wishlist.
     */
    id,
    /**
     * Whether the wishlist is empty, ie, with no items.
     */
    isEmpty,
    /**
     * Whether the wishlist is loading.
     */
    isLoading,
    /**
     * The number of different items in the wishlist, regardless of each one's
     * quantity.
     */
    itemCount,
    /**
     * Wishlist items of the fetched wishlist.
     */
    items,
    /**
     * Wishlist items of the fetched wishlist, with the respective parent wishlist set
     * data.
     */
    itemsWithSetsInfo,
    /**
     * Resets the wishlist.
     */
    resetWishlist,
    /**
     * Resets the wishlist state.
     */
    resetWishlistState,
    /**
     * The total quantity of products in the current user's wishlist, accounting with
     * each item's quantity.
     */
    totalQuantity,
    /**
     * Fetched wishlist data.
     */
    wishlist,
  };
};

export default useWishlist;
