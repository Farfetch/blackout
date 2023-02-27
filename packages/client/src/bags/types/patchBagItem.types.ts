import type { Bag } from './bag.types';
import type { BagItem, BagItemMetadata } from './bagItem.types';
import type { Config } from '../..';
import type { PatchBagItemQuery } from './query.types';
import type { Product } from '../../products/types';

export type PatchBagItemData = {
  // Product identifier.
  productId: Product['result']['id'];
  // Merchant identifier.
  merchantId?: number;
  // Bag item quantity.
  quantity: number;
  // Bag item size.
  size: number;
  // Bag item scale.
  scale: number;
  // Previous quantity of the item - NOTE: This parameter is not used by the
  // api but are necessary for the middlewares
  oldQuantity?: number;
  // Previous size of the item - NOTE: This parameter is not used by the api
  // but are necessary for the middlewares
  oldSize?: number;
  // From where the action was triggered (for analytics purposes) - NOTE: This
  // parameter is not used by the api but are necessary for the middlewares
  from?: string;
  // Extra fields that a tenant could store related to the resource
  // based on a predefined json schema.
  metadata?: BagItemMetadata;
};

export type PatchBagItem = (
  id: Bag['id'] | null,
  itemId: BagItem['id'],
  data: PatchBagItemData,
  query?: PatchBagItemQuery,
  config?: Config,
) => Promise<Bag>;
