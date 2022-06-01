import type { Bag } from './bag.types';
import type { BagItem } from './bagItem.types';
import type { Product } from '../../products/types';
import type { Query } from './query.types';

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
  query?: Query,
  config?: Record<string, unknown>,
) => Promise<Bag>;
