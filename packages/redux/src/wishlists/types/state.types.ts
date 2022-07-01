import type {
  BlackoutError,
  Wishlist,
  WishlistSet,
} from '@farfetch/blackout-client';
import type { CombinedState } from 'redux';
import type { WishlistItemEntity } from '../../entities/types';

type WishlistNormalized = Omit<Wishlist, 'items'> & {
  items: Array<WishlistItemEntity['id']>;
};

export type WishlistSetsState = CombinedState<{
  error: BlackoutError | null;
  ids: Array<WishlistSet['setId']> | null;
  isLoading: boolean;
  set: {
    error: Record<WishlistSet['setId'], BlackoutError | null | undefined>;
    isLoading: Record<WishlistSet['setId'], boolean | undefined>;
  };
}>;

export type WishlistsState = CombinedState<{
  error: BlackoutError | null;
  id: Wishlist['id'] | null;
  isLoading: boolean;
  result: WishlistNormalized | Record<string, never>;
  items: {
    ids: Array<WishlistItemEntity['id']> | null;
    item: {
      error: Record<WishlistItemEntity['id'], BlackoutError | null | undefined>;
      isLoading: Record<WishlistItemEntity['id'], boolean | undefined>;
    };
  };
  sets: WishlistSetsState;
}>;
