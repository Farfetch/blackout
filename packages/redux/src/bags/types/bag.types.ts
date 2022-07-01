import type { Bag, BagItem } from '@farfetch/blackout-client';

export type BagNormalized = Omit<Bag, 'items'> & {
  items: Array<BagItem['id']>;
};
