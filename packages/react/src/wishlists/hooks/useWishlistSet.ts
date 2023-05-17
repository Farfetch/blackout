/**
 * Hook to provide all kinds of data for the business logic attached to the
 * wishlist set.
 */
import {
  getWishlistSet,
  getWishlistSetError,
  getWishlistSetItemsCounter,
  getWishlistSetTotalQuantity,
  isWishlistSetFetched,
  isWishlistSetLoading,
  type StoreState,
  type WishlistSetActionMetadata,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import useWishlistSets from './useWishlistSets.js';
import type {
  Config,
  PatchWishlistSetData,
  WishlistSet,
} from '@farfetch/blackout-client';
import type { UseWishlistSetOptions } from './types/index.js';

/**
 * Provides Redux actions and state access to deal with wishlist set business
 * logic.
 *
 * @param setId - Wishlist set identifier.
 *
 * @returns All the state, actions and relevant data needed to manage a wishlist set.
 */
const useWishlistSet = (
  setId: WishlistSet['setId'],
  options: UseWishlistSetOptions = {},
) => {
  const { enableAutoFetch = true, fetchConfig } = options;

  const error = useSelector((state: StoreState) =>
    getWishlistSetError(state, setId),
  );
  const isLoading = useSelector((state: StoreState) =>
    isWishlistSetLoading(state, setId),
  );
  const wishlistSet = useSelector((state: StoreState) =>
    getWishlistSet(state, setId),
  );
  const itemsCounter = useSelector((state: StoreState) =>
    getWishlistSetItemsCounter(state, setId),
  );
  const totalQuantity = useSelector((state: StoreState) =>
    getWishlistSetTotalQuantity(state, setId),
  );
  const isFetched = useSelector((state: StoreState) =>
    isWishlistSetFetched(state, setId),
  );

  const {
    actions: {
      fetchWishlistSet,
      remove: removeWishlistSet,
      update: updateWishlistSet,
    },
  } = useWishlistSets({ enableAutoFetch: false });

  const fetch = useCallback(
    (config?: Config) => {
      if (!setId) {
        return Promise.reject(new Error('No set id was specified'));
      }

      return fetchWishlistSet(setId, config);
    },
    [fetchWishlistSet, setId],
  );

  const remove = useCallback(
    (config?: Config) => {
      if (!setId) {
        return Promise.reject(new Error('No set id was specified'));
      }

      return removeWishlistSet(setId, config);
    },
    [removeWishlistSet, setId],
  );

  const update = useCallback(
    (
      data: PatchWishlistSetData,
      metadata?: WishlistSetActionMetadata,
      config?: Config,
    ) => {
      if (!setId) {
        return Promise.reject(new Error('No set id was specified'));
      }

      return updateWishlistSet(setId, data, metadata, config);
    },
    [updateWishlistSet, setId],
  );

  useEffect(() => {
    if (setId && !isLoading && !isFetched && enableAutoFetch) {
      fetch(fetchConfig);
    }
  }, [isFetched, fetch, isLoading, setId, enableAutoFetch, fetchConfig]);

  const data = useMemo(() => {
    if (!wishlistSet) {
      return undefined;
    }

    return {
      itemsCounter,
      totalQuantity,
      ...wishlistSet,
    };
  }, [itemsCounter, totalQuantity, wishlistSet]);

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
    actions: {
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
      fetch,
    },
    data,
  };
};

export default useWishlistSet;
