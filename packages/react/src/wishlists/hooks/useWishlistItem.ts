/**
 * Hook to provide data for the business logic attached to a wishlist item.
 */
import {
  getWishlistItem,
  getWishlistItemError,
  isWishlistItemLoading,
  type StoreState,
  type WishlistItemActionMetadata,
} from '@farfetch/blackout-redux';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import useWishlist from './useWishlist';
import type { PatchWishlistItemData } from '@farfetch/blackout-client';
import type { WishlistItemId } from './types/useWishlistItem.types';

/**
 * Provides Redux actions and state access for dealing with wishlist item business
 * logic.
 *
 * @param wishlistItemId - Wishlist item identifier.
 *
 * @returns All the state, actions and relevant data needed to manage a wishlist item operation.
 */
const useWishlistItem = (wishlistItemId: WishlistItemId) => {
  const {
    actions: { updateItem, removeItem },
  } = useWishlist();
  // Selectors
  const error = useSelector((state: StoreState) =>
    getWishlistItemError(state, wishlistItemId),
  );
  const isLoading = useSelector((state: StoreState) =>
    isWishlistItemLoading(state, wishlistItemId),
  );
  const item = useSelector((state: StoreState) =>
    getWishlistItem(state, wishlistItemId),
  );

  const update = useCallback(
    (data: PatchWishlistItemData, metadata?: WishlistItemActionMetadata) =>
      updateItem(wishlistItemId, data, metadata),
    [updateItem, wishlistItemId],
  );

  const remove = useCallback(
    (metadata?: WishlistItemActionMetadata) =>
      removeItem(wishlistItemId, metadata),
    [removeItem, wishlistItemId],
  );

  return {
    isLoading,
    error,
    isFetched: !!item,
    data: item,
    actions: {
      update,
      remove,
    },
  };
};

export default useWishlistItem;
