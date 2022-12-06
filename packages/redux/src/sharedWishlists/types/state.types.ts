import type { BlackoutError, SharedWishlist } from '@farfetch/blackout-client';
import type { CombinedState } from 'redux';

export type SharedWishlistState = CombinedState<{
  error: BlackoutError | null;
  isLoading: boolean;
  result: SharedWishlist['id'] | null;
}>;
