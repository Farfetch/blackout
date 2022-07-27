import type { BagItem } from '@farfetch/blackout-client';

export type BagItemId = BagItem['id'];

export type HandleUpdateBagItemData = {
  quantity?: number;
  sizeId?: number;
};
