/**
 * Hook to provide all kinds of data for the business logic attached to the
 * wishlist set.
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
 * Provides Redux actions and state access to deal with wishlist set business
 * logic.
 *
 * @param setId - Wishlist set identifier.
 *
 * @returns All the state, actions and relevant data needed to manage a wishlist set.
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
     */
    error,
    /**
     * Whether the wishlist set is fetched.
     */
    isFetched,
    /**
     * Whether the wishlist set is loading.
     */
    isLoading,
    /**
     * Number of different items in the wishlist set.
     */
    itemsCounter,
    /**
     * Removes the wishlist set.
     */
    removeWishlistSet,
    /**
     * Total quantity of the items in the wishlist set.
     */
    totalQuantity,
    /**
     * Updates the wishlist set.
     */
    updateWishlistSet,
    /**
     * Fetched wishlist set.
     */
    wishlistSet,
  };
};

export default useWishlistSet;