import type { Return } from '@farfetch/blackout-client';

export type ReturnsEntity = Omit<Return, 'items'> & {
  items: Array<Return['id']>;
};
