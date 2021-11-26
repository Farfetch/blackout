import type { CombinedState } from 'redux';
import type { Error } from '@farfetch/blackout-client/types';
import type {
  Wishlist,
  WishlistSet,
} from '@farfetch/blackout-client/wishlists/types';
import type { WishlistItemEntity } from '../../entities/types';

type NormalizedWishlist = Omit<Wishlist, 'items'> & {
  items: Array<WishlistItemEntity['id']>;
};

export type SetsState = CombinedState<{
  error: Error | null;
  ids: Array<WishlistSet['setId']> | null;
  isLoading: boolean;
  set: {
    error: Record<WishlistSet['setId'], Error | null | undefined>;
    isLoading: Record<WishlistSet['setId'], boolean | undefined>;
  };
}>;

export type State = CombinedState<{
  error: Error | null;
  id: Wishlist['id'] | null;
  isLoading: boolean;
  result: NormalizedWishlist | Record<string, never>;
  items: {
    ids: Array<WishlistItemEntity['id']> | null;
    item: {
      error: Record<WishlistItemEntity['id'], Error | null | undefined>;
      isLoading: Record<WishlistItemEntity['id'], boolean | undefined>;
    };
  };
  sets: SetsState;
}>;
