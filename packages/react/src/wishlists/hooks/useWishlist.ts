/**
 * Hook to provide all kinds of data for the business logic attached to the
 * wishlists.
 */
import {
  addWishlistItem,
  fetchWishlist as fetchWishlistAction,
  getUser,
  getWishlist,
  getWishlistError,
  getWishlistItems,
  isWishlistFetched,
  isWishlistLoading,
  removeWishlistItem,
  resetWishlist,
  updateWishlistItem,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction.js';
// Types
import type { Config } from '@farfetch/blackout-client';
import type { UseWishlistOptions } from './types/index.js';

/**
 * Provides Redux actions and state access, as well as handlers for dealing with
 * wishlist business logic. It will fetch wishlist data from the current user's wishlist.
 *
 * @returns All the handlers, state, actions and relevant data needed to manage any wishlist operation.
 */
const useWishlist = (options: UseWishlistOptions = {}) => {
  const { enableAutoFetch = false, fetchConfig } = options;
  // Selectors
  const error = useSelector(getWishlistError);
  const isLoading = useSelector(isWishlistLoading);
  const items = useSelector(getWishlistItems);
  const wishlist = useSelector(getWishlist);
  const userWishlistId = useSelector(getUser)?.wishlistId;
  const isFetched = useSelector(isWishlistFetched);
  // Actions
  const addItem = useAction(addWishlistItem);
  const updateItem = useAction(updateWishlistItem);
  const removeItem = useAction(removeWishlistItem);
  const fetchWishlist = useAction(fetchWishlistAction);

  const fetch = useCallback(
    (config?: Config) => {
      if (!userWishlistId) {
        return Promise.reject(
          new Error(
            "User's wishlist id is not loaded. Please, fetch the user before using this action",
          ),
        );
      }

      return fetchWishlist(userWishlistId, config);
    },
    [fetchWishlist, userWishlistId],
  );

  const reset = useAction(resetWishlist);
  // Data with some logic
  const count = wishlist?.count;
  const isEmpty = count === 0 || count === undefined;

  useEffect(() => {
    if (!isLoading && !isFetched && enableAutoFetch && userWishlistId) {
      fetch(fetchConfig);
    }
  }, [
    enableAutoFetch,
    fetch,
    fetchConfig,
    isFetched,
    isLoading,
    userWishlistId,
  ]);

  const data = useMemo(() => {
    if (!wishlist) {
      return undefined;
    }

    return {
      ...wishlist,
      count,
      isEmpty,
      items,
    };
  }, [count, isEmpty, items, wishlist]);

  return {
    isLoading,
    error,
    isFetched,
    actions: {
      fetch,
      reset,
      addItem,
      updateItem,
      removeItem,
    },
    data,
  };
};

export default useWishlist;
