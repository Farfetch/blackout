import type {
  Config,
  PatchWishlistItemData,
  Wishlist,
  WishlistItem,
} from '@farfetch/blackout-client';
import type { PostWishlistItemActionData } from '@farfetch/blackout-redux';

export type Options = {
  enableAutoFetch?: boolean;
};

export type AddItem = (
  data: PostWishlistItemActionData,
  config?: Config,
) => Promise<Wishlist | undefined>;

export type UpdateItem = (
  itemId: WishlistItem['id'],
  data: PatchWishlistItemData,
  config?: Config,
) => Promise<Wishlist | undefined>;

export type RemoveItem = (
  itemId: WishlistItem['id'],
  config?: Config,
) => Promise<Wishlist | undefined>;

export type FetchWishlist = (
  id: Wishlist['id'],
  config?: Config,
) => Promise<Wishlist | undefined>;

export type ResetWishlist = () => void;
