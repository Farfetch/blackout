import type { Bag } from './bag.types';
import type { BagItem } from './bagItem.types';
import type { Config } from '../..';
import type { PatchBagItemQuery } from './query.types';
import type { Product } from '../../products/types';

export type PatchBagItemData = {
  // Product identifier.
  productId: Product['result']['id'];
  // Merchant identifier.
  merchantId: number;
  // Bag item quantity.
  quantity: number;
  // Bag item size.
  size: number;
  // Bag item scale.
  scale: number;
};

export type PatchBagItem = (
  id: Bag['id'] | null,
  itemId: BagItem['id'],
  data: PatchBagItemData,
  query?: PatchBagItemQuery,
  config?: Config,
) => Promise<Bag>;
