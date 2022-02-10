/**
 * Hook to provide all kinds of data for the business logic attached to the wishlist set.
 *
 * @module useWishlistSet
 * @category Wishlists
 * @subcategory Hooks
 */
import {
  fetchWishlistSet as fetchWishlistSetAction,
  getWishlistSet,
  getWishlistSetError,
  getWishlistSetItemsCounter,
  getWishlistSetTotalQuantity,
  isWishlistSetFetched,
  isWishlistSetLoading,
  removeWishlistSet as removeWishlistSetAction,
  updateWishlistSet as updateWishlistSetAction,
} from '@farfetch/blackout-redux/wishlists';
import { useAction } from '../../helpers';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { UseWishlistSet } from './types';

/**
 * Provides Redux actions and state access to deal with
 * wishlist set business logic.
 *
 * @memberof module:wishlists/hooks
 *
 * @param {number} setId - Wishlist set identifier.
 *
 * @returns {object} All the state, actions and relevant data needed
 * to manage a wishlist set.
 */
const useWishlistSet: UseWishlistSet = setId => {
  const error = useSelector(state => getWishlistSetError(state, setId));
  const isLoading = useSelector(state => isWishlistSetLoading(state, setId));
  const wishlistSet = useSelector(state => getWishlistSet(state, setId));
  const itemsCounter = useSelector(state =>
    getWishlistSetItemsCounter(state, setId),
  );
  const totalQuantity = useSelector(state =>
    getWishlistSetTotalQuantity(state, setId),
  );
  const isFetched = useSelector(state => isWishlistSetFetched(state, setId));
  const fetchWishlistSet = useAction(fetchWishlistSetAction);
  const removeWishlistSet = useAction(removeWishlistSetAction);
  const updateWishlistSet = useAction(updateWishlistSetAction);

  useEffect(() => {
    if (setId && !isLoading && !isFetched) {
      fetchWishlistSet(setId);
    }
  }, [isFetched, fetchWishlistSet, isLoading, setId]);

  return {
    /**
     * Error state of the fetched wishlist set.
     *
     * @type {object|undefined}
     */
    error,
    /**
     * Whether the wishlist set is fetched.
     *
     * @type {boolean}
     */
    isFetched,
    /**
     * Whether the wishlist set is loading.
     *
     * @type {boolean}
     */
    isLoading,
    /**
     * Number of different items in the wishlist set.
     *
     * @type {number}
     */
    itemsCounter,
    /**
     * Removes the wishlist set.
     *
     * @type {Function}
     */
    removeWishlistSet,
    /**
     * Total quantity of the items in the wishlist set.
     *
     * @type {number}
     */
    totalQuantity,
    /**
     * Updates the wishlist set.
     *
     * @type {Function}
     */
    updateWishlistSet,
    /**
     * Fetched wishlist set.
     *
     * @type {object}
     */
    wishlistSet,
  };
};

export default useWishlistSet;
