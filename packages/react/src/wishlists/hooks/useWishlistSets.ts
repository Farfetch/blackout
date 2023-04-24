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
  getUser,
  getWishlistSets,
  getWishlistSetsError,
  isAnyWishlistSetLoading as isAnyWishlistSetLoadingSelector,
  removeWishlistSet as removeWishlistSetAction,
  resetWishlistSets as resetWishlistSetsAction,
  updateWishlistSet as updateWishlistSetAction,
  type WishlistSetActionMetadata,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import type {
  Config,
  PatchWishlistSetData,
  PostWishlistSetData,
  WishlistSet,
} from '@farfetch/blackout-client';
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
  const user = useSelector(getUser);

  // Actions
  const addWishlistSet = useAction(addWishlistSetAction);
  const fetchWishlistSets = useAction(fetchWishlistSetsAction);
  const fetchWishlistSetAux = useAction(fetchWishlistSetAction);
  const removeWishlistSet = useAction(removeWishlistSetAction);
  const updateWishlistSet = useAction(updateWishlistSetAction);
  const resetWishlistSets = useAction(resetWishlistSetsAction);

  const userWishlistId = user?.isGuest === false ? user.wishlistId : undefined;

  const add = useCallback(
    (data: PostWishlistSetData, config: Config | undefined = fetchConfig) => {
      if (!userWishlistId) {
        return Promise.reject(
          new Error(
            "User's wishlist id is not loaded. Please, fetch the user before using this action",
          ),
        );
      }

      return addWishlistSet(userWishlistId, data, config);
    },
    [addWishlistSet, fetchConfig, userWishlistId],
  );

  const remove = useCallback(
    (
      wishlistSetId: WishlistSet['setId'],
      config: Config | undefined = fetchConfig,
    ) => {
      if (!userWishlistId) {
        return Promise.reject(
          new Error(
            "User's wishlist id is not loaded. Please, fetch the user before using this action",
          ),
        );
      }

      return removeWishlistSet(userWishlistId, wishlistSetId, config);
    },
    [fetchConfig, removeWishlistSet, userWishlistId],
  );

  const update = useCallback(
    (
      wishlistSetId: WishlistSet['setId'],
      data: PatchWishlistSetData,
      metadata?: WishlistSetActionMetadata,
      config: Config | undefined = fetchConfig,
    ) => {
      if (!userWishlistId) {
        return Promise.reject(
          new Error(
            "User's wishlist id is not loaded. Please, fetch the user before using this action",
          ),
        );
      }

      return updateWishlistSet(
        userWishlistId,
        wishlistSetId,
        data,
        metadata,
        config,
      );
    },
    [fetchConfig, updateWishlistSet, userWishlistId],
  );

  const fetchWishlistSet = useCallback(
    (
      wishlistSetId: WishlistSet['setId'],
      config: Config | undefined = fetchConfig,
    ) => {
      if (!userWishlistId) {
        return Promise.reject(
          new Error(
            "User's wishlist id is not loaded. Please, fetch the user before using this action",
          ),
        );
      }

      return fetchWishlistSetAux(userWishlistId, wishlistSetId, config);
    },
    [fetchConfig, fetchWishlistSetAux, userWishlistId],
  );

  const fetch = useCallback(
    (config: Config | undefined = fetchConfig) => {
      if (!userWishlistId) {
        return Promise.reject(
          new Error(
            "User's wishlist id is not loaded. Please, fetch the user before using this action",
          ),
        );
      }

      return fetchWishlistSets(userWishlistId, config);
    },
    [fetchConfig, fetchWishlistSets, userWishlistId],
  );

  useEffect(() => {
    if (!areLoading && !areFetched && enableAutoFetch && userWishlistId) {
      fetchWishlistSets(userWishlistId, fetchConfig);
    }
  }, [
    areFetched,
    areLoading,
    enableAutoFetch,
    fetchConfig,
    fetchWishlistSets,
    userWishlistId,
  ]);

  return {
    actions: {
      /**
       * Adds a wishlist set.
       */
      add,
      /**
       * Removes the wishlist set.
       */
      remove,
      /**
       * Updates the wishlist set.
       */
      update,
      /**
       * Fetches the wishlist set.
       */
      fetchWishlistSet,
      /**
       * Fetches the wishlist sets.
       */
      fetch,
      /**
       * Resets the wishlist sets.
       */
      reset: resetWishlistSets,
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
