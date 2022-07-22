import type { Bag, BagItem } from '@farfetch/blackout-client';

export type BagItemId = BagItem['id'];

export type HandleUpdateBagItem = ({
  quantity,
  sizeId,
}: {
  quantity?: number;
  sizeId?: number;
}) => Promise<void | Bag> | undefined;
