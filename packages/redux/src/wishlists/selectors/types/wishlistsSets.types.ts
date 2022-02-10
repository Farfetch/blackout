import type { Error } from '@farfetch/blackout-client/types';

export type WishlistSetsErrors = Array<{
  id: string;
  name?: string;
  error: Error;
}>;
