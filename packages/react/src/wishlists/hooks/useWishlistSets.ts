/**
 * Hook to provide data for the business logic attached to the wishlist sets.
 */
import {
  addWishlistSet as addWishlistSetAction,
  areWishlistSetsFetched,
  areWishlistSetsLoading,
  areWishlistSetsWithAnyError,
  fetchWishlistSet as fetchWishlistSetAction,
  fetchWishlistSets as fetchWishlistSetsAction,
  getAllWishlistSetsErrors,
  getWishlistSets,
  getWishlistSetsError,
  isAnyWishlistSetLoading as isAnyWishlistSetLoadingSelector,
  removeWishlistSet as removeWishlistSetAction,
  resetWishlistSets as resetWishlistSetsAction,
  resetWishlistSetsState as resetWishlistSetsStateAction,
  updateWishlistSet as updateWishlistSetAction,
} from '@farfetch/blackout-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import type { UseWishlistSetsOptions } from './types/index.js';

/**
 * Provides Redux actions and state access for dealing with wishlist sets business
 * logic.
 *
 * @returns All the handlers, state, actions and relevant data needed to manage any wishlist sets
 * operation.
 */

const useWishlistSets = (options: UseWishlistSetsOptions = {}) => {
  const { enableAutoFetch = true, fetchConfig } = options;
  // Selectors
  const allWishlistSetsErrors = useSelector(getAllWishlistSetsErrors);
  const areLoading = useSelector(areWishlistSetsLoading);
  const areFetched = useSelector(areWishlistSetsFetched);
  const error = useSelector(getWishlistSetsError);
  const isAnyWishlistSetLoading = useSelector(isAnyWishlistSetLoadingSelector);
  const isAnyWishlistSetWithError = useSelector(areWishlistSetsWithAnyError);
  const wishlistSets = useSelector(getWishlistSets);
  // Actions
  const addWishlistSet = useAction(addWishlistSetAction);
  const fetchWishlistSets = useAction(fetchWishlistSetsAction);
  const fetchWishlistSet = useAction(fetchWishlistSetAction);
  const removeWishlistSet = useAction(removeWishlistSetAction);
  const updateWishlistSet = useAction(updateWishlistSetAction);
  const resetWishlistSets = useAction(resetWishlistSetsAction);
  const resetWishlistSetsState = useAction(resetWishlistSetsStateAction);

  useEffect(() => {
    if (!areLoading && !areFetched && enableAutoFetch) {
      fetchWishlistSets(fetchConfig);
    }
  }, [areFetched, areLoading, enableAutoFetch, fetchConfig, fetchWishlistSets]);

  return {
    actions: {
      /**
       * Adds a wishlist set.
       */
      add: addWishlistSet,
      /**
       * Removes the wishlist set.
       */
      remove: removeWishlistSet,
      /**
       * Updates the wishlist set.
       */
      update: updateWishlistSet,
      /**
       * Fetches the wishlist set.
       */
      fetchWishlistSet,
      /**
       * Fetches the wishlist sets.
       */
      fetch: fetchWishlistSets,
      /**
       * Resets the wishlist sets.
       */
      reset: resetWishlistSets,
      /**
       * Resets the wishlist sets state.
       */
      resetWishlistSetsState,
    },
    /**
     * List of error states for the wishlist sets.
     */
    allWishlistSetsErrors,
    /**
     * Whether the wishlist sets are loading.
     */
    areLoading,
    /**
     * Whether the fetch request of the wishlist sets finished either with success or error.
     */
    areFetched,
    /**
     * Error state of the fetched wishlist sets.
     */
    error,
    /**
     * Whether any of the wishlist sets is loading.
     */
    isAnyWishlistSetLoading,
    /**
     * Whether any of the wishlist sets is has an error.
     */
    isAnyWishlistSetWithError,
    /**
     * Fetched wishlist sets data.
     */
    data: wishlistSets,
  };
};

export default useWishlistSets;
