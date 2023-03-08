import type { Bag } from './bag.types.js';
import type { BagItemMetadata, Config } from '../../index.js';
import type { PostBagItemQuery } from './query.types.js';
import type { Product } from '../../products/types/index.js';

export type PostBagItemData = {
  // Product identifier.
  productId: Product['result']['id'];
  // Product aggregator identifier.
  productAggregatorId?: number;
  // Merchant identifier.
  merchantId: number;
  // Bag item quantity.
  quantity: number;
  // Bag item size.
  size: number;
  // Bag item scale.
  scale: number;
  // For customizable products, string describing the product
  // customization, typically in JSON format. For example, users may be
  // able to customize the materials and colors of parts of the product.
  customAttributes?: string | null;
  // For restriction product. This value is a code, received by the
  // user, used to unlock the AddToBag operation.
  authCode?: string;
  // Extra fields that a tenant could store related to the resource
  // based on a predefined json schema.
  metadata?: BagItemMetadata;
};

export type PostBagItem = (
  id: Bag['id'] | null,
  data: PostBagItemData,
  query?: PostBagItemQuery,
  config?: Config,
) => Promise<Bag>;
