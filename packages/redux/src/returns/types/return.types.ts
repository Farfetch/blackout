import type { Return, ReturnItem } from '@farfetch/blackout-client';

export type ReturnNormalized = Omit<Return, 'items'> & {
  items: Array<ReturnItem['id']>;
};
