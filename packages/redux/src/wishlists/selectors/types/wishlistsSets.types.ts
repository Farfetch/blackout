import type { BlackoutError } from '@farfetch/blackout-client/types';

export type WishlistSetsErrors = Array<{
  id: string;
  name?: string;
  error: BlackoutError;
}>;
