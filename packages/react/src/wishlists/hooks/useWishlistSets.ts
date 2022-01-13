/**
 * Hook to provide data for the business logic attached to the wishlist sets.
 *
 * @module useWishlistSets
 * @category Wishlist Sets
 * @subcategory Hooks
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
} from '@farfetch/blackout-redux/wishlists';
import { useAction } from '../../helpers';
import { useSelector } from 'react-redux';
import type { UseWishlistSets } from './types';

/**
 * Provides Redux actions and state access for dealing with
 * wishlist sets business logic.
 *
 * @memberof module:wishlists/hooks
 *
 * @returns {object} All the handlers, state, actions and relevant data needed
 * to manage any wishlist sets operation.
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
     *
     * @type {Function}
     */
    addWishlistSet,
    /**
     * List of error states for the wishlist sets.
     *
     * @type {Array|undefined}
     */
    allWishlistSetsErrors,
    /**
     * Whether the wishlist sets are loading.
     *
     * @type {boolean}
     */
    areLoading,
    /**
     * Error state of the fetched wishlist sets.
     *
     * @type {object|undefined}
     */
    error,
    /**
     * Fetches the wishlist sets.
     *
     * @type {Function}
     */
    fetchWishlistSets,
    /**
     * Whether any of the wishlist sets is loading.
     *
     * @type {boolean}
     */
    isAnyWishlistSetLoading,
    /**
     * Whether any of the wishlist sets is has an error.
     *
     * @type {boolean}
     */
    isAnyWishlistSetWithError,
    /**
     * Resets the wishlist sets.
     *
     * @type {Function}
     */
    resetWishlistSets,
    /**
     * Resets the wishlist sets state.
     *
     * @type {Function}
     */
    resetWishlistSetsState,
    /**
     * Fetched wishlist sets data.
     *
     * @type {object}
     */
    wishlistSets,
  };
};

export default useWishlistSets;
