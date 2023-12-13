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
  type StoreState,
  updateWishlistItem,
  type WishlistItemActionMetadata,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect, useMemo } from 'react';
import { useSelector, useStore } from 'react-redux';
import useAction from '../../helpers/useAction.js';
// Types
import type {
  Config,
  PatchWishlistItemData,
  PostWishlistItemData,
  WishlistItem,
} from '@farfetch/blackout-client';
import type { UseWishlistOptions } from './types/index.js';

/**
 * Provides Redux actions and state access, as well as handlers for dealing with
 * wishlist business logic. It will fetch wishlist data from the current user's wishlist.
 *
 * @returns All the handlers, state, actions and relevant data needed to manage any wishlist operation.
 */
const useWishlist = (options: UseWishlistOptions = {}) => {
  const { getState } = useStore<StoreState>();
  const { enableAutoFetch = true, fetchConfig } = options;
  // Selectors
  const error = useSelector(getWishlistError);
  const isLoading = useSelector(isWishlistLoading);
  const items = useSelector(getWishlistItems);
  const wishlist = useSelector(getWishlist);
  const userWishlistId = useSelector(getUser)?.wishlistId;
  const isFetched = useSelector(isWishlistFetched);
  // Actions
  const addItemAction = useAction(addWishlistItem);
  const updateItemAction = useAction(updateWishlistItem);
  const removeItemAction = useAction(removeWishlistItem);
  const fetchWishlist = useAction(fetchWishlistAction);

  const fetch = useCallback(
    (config: Config | undefined = fetchConfig) => {
      if (!userWishlistId) {
        return Promise.reject(
          new Error(
            "User's wishlist id is not loaded. Please, fetch the user before using this action",
          ),
        );
      }

      return fetchWishlist(userWishlistId, config);
    },
    [fetchConfig, fetchWishlist, userWishlistId],
  );

  const addItem = useCallback(
    (
      data: PostWishlistItemData,
      metadata?: WishlistItemActionMetadata | undefined,
      config: Config | undefined = fetchConfig,
    ) => {
      if (!userWishlistId) {
        return Promise.reject(
          new Error(
            "User's wishlist id is not loaded. Please, fetch the user before using this action",
          ),
        );
      }

      const currentUserWishlistId = getUser(getState())?.wishlistId;

      // Check if we have the updated user wishlist Id
      const wishlistId =
        currentUserWishlistId && currentUserWishlistId !== userWishlistId
          ? currentUserWishlistId
          : userWishlistId;

      return addItemAction(wishlistId, data, metadata, config);
    },
    [addItemAction, fetchConfig, userWishlistId, getState],
  );

  const updateItem = useCallback(
    (
      wishlistItemId: WishlistItem['id'],
      data: PatchWishlistItemData,
      metadata?: WishlistItemActionMetadata,
      config: Config | undefined = fetchConfig,
    ) => {
      if (!userWishlistId) {
        return Promise.reject(
          new Error(
            "User's wishlist id is not loaded. Please, fetch the user before using this action",
          ),
        );
      }

      return updateItemAction(
        userWishlistId,
        wishlistItemId,
        data,
        metadata,
        config,
      );
    },
    [fetchConfig, userWishlistId, updateItemAction],
  );

  const removeItem = useCallback(
    (
      wishlistItemId: WishlistItem['id'],
      metadata?: WishlistItemActionMetadata,
      config: Config | undefined = fetchConfig,
    ) => {
      if (!userWishlistId) {
        return Promise.reject(
          new Error(
            "User's wishlist id is not loaded. Please, fetch the user before using this action",
          ),
        );
      }

      return removeItemAction(userWishlistId, wishlistItemId, metadata, config);
    },
    [fetchConfig, userWishlistId, removeItemAction],
  );

  const reset = useAction(resetWishlist);
  // Data with some logic
  const count = wishlist?.count;
  const isEmpty = count === 0 || count === undefined;

  useEffect(() => {
    const updatedState = getState();

    const updatedIsLoading = isWishlistLoading(updatedState);
    const updatedIsFetched = isWishlistFetched(updatedState);

    if (
      !updatedIsLoading &&
      !updatedIsFetched &&
      enableAutoFetch &&
      userWishlistId
    ) {
      fetch(fetchConfig);
    }
  }, [
    enableAutoFetch,
    fetch,
    fetchConfig,
    isFetched,
    isLoading,
    userWishlistId,
    getState,
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
