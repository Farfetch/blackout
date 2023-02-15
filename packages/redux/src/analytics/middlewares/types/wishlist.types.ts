import type { PatchWishlistSetData } from '@farfetch/blackout-client';

export type WishlistProductUpdateSetActionMetadata = Partial<
  {
    data: PatchWishlistSetData;
    isAddOperation: boolean;
    isDeleteOperation: boolean;
    from: string;
    wishlistSetId: string;
    listId: string;
    position: number;
  } & Record<string, unknown>
>;

export type WishlistActionProcessedOptions = {
  ADD_WISHLIST_ITEM_SUCCESS: string;
  REMOVE_WISHLIST_ITEM_SUCCESS: string;
  UPDATE_WISHLIST_SET_SUCCESS: string;
  UPDATE_WISHLIST_ITEM_SUCCESS: string;
};

export type WishlistActionMiddlewareOptions =
  Partial<WishlistActionProcessedOptions>;
