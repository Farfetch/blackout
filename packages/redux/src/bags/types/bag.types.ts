import type { Bag, BagItem } from '@farfetch/blackout-client/bags/types';

export type NormalizedBag = Omit<Bag, 'items'> & {
  items: Array<BagItem['id']>;
};
