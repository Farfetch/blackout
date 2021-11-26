import type { Bag } from './bag.types';
import type { BagItem } from './bagItem.types';
import type { Product } from '../../products/types';
import type { Query } from './query.types';

export type PatchBagItemData = {
  productId: Product['result']['id'];
  merchantId: number;
  quantity: number;
  size: number;
  scale: number;
};

export type PatchBagItem = (
  id: Bag['id'] | null,
  itemId: BagItem['id'],
  data: PatchBagItemData,
  query?: Query,
  config?: Record<string, unknown>,
) => Promise<Bag>;
