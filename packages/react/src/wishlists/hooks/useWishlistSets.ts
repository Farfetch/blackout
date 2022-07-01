/**
 * Hook to provide data for the business logic attached to the wishlist sets.
 */
import {
  addWishlistSet as addWishlistSetAction,
  areWishlistSetsLoading,
  areWishlistSetsWithAnyError,
  fetchWishlistSets as fetchWishlistSetsAction,
  getAllWishlistSetsErrors,
  getWishlistSets,
  getWishlistSetsError,
  isAnyWishlistSetLoading as isAnyWishlistSetLoadingSelector,
  resetWishlistSets as resetWishlistSetsAction,
  resetWishlistSetsState as resetWishlistSetsStateAction,
} from '@farfetch/blackout-redux';
import { useAction } from '../../helpers';
import { useSelector } from 'react-redux';
import type { UseWishlistSets } from './types';

/**
 * Provides Redux actions and state access for dealing with wishlist sets business
 * logic.
 *
 * @returns All the handlers, state, actions and relevant data needed to manage any wishlist sets
 * operation.
 */
const useWishlistSets: UseWishlistSets = () => {
  // Selectors
  const allWishlistSetsErrors = useSelector(getAllWishlistSetsErrors);
  const areLoading = useSelector(areWishlistSetsLoading);
  const error = useSelector(getWishlistSetsError);
  const isAnyWishlistSetLoading = useSelector(isAnyWishlistSetLoadingSelector);
  const isAnyWishlistSetWithError = useSelector(areWishlistSetsWithAnyError);
  const wishlistSets = useSelector(getWishlistSets);
  // Actions
  const addWishlistSet = useAction(addWishlistSetAction);
  const fetchWishlistSets = useAction(fetchWishlistSetsAction);
  const resetWishlistSets = useAction(resetWishlistSetsAction);
  const resetWishlistSetsState = useAction(resetWishlistSetsStateAction);

  return {
    /**
     * Adds a wishlist set.
     */
    addWishlistSet,
    /**
     * List of error states for the wishlist sets.
     */
    allWishlistSetsErrors,
    /**
     * Whether the wishlist sets are loading.
     */
    areLoading,
    /**
     * Error state of the fetched wishlist sets.
     */
    error,
    /**
     * Fetches the wishlist sets.
     */
    fetchWishlistSets,
    /**
     * Whether any of the wishlist sets is loading.
     */
    isAnyWishlistSetLoading,
    /**
     * Whether any of the wishlist sets is has an error.
     */
    isAnyWishlistSetWithError,
    /**
     * Resets the wishlist sets.
     */
    resetWishlistSets,
    /**
     * Resets the wishlist sets state.
     */
    resetWishlistSetsState,
    /**
     * Fetched wishlist sets data.
     */
    wishlistSets,
  };
};

export default useWishlistSets;
