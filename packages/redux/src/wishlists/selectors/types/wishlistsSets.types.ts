import type { BlackoutError } from '@farfetch/blackout-client';

export type WishlistSetsErrors = Array<{
  id: string;
  name?: string;
  error: BlackoutError;
}>;
