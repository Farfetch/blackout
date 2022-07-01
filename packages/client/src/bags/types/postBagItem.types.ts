import type { Bag } from './bag.types';
import type { Config } from '../..';
import type { PostBagItemQuery } from './query.types';
import type { Product } from '../../products/types';

export type PostBagItemData = {
  // Product identifier.
  productId: Product['result']['id'];
  // Product aggregator identifier.
  productAggregatorId?: number;
  // Merchant identifier.
  merchantId?: number;
  // Bag item quantity.
  quantity?: number;
  // Bag item size.
  size: number;
  // Bag item scale.
  scale: number;
  // For customizable products, string describing the product
  // customization, typically in JSON format. For example, users may be
  // able to customize the materials and colors of parts of the product.
  customAttributes?: string;
  // For restriction product. This value is a code, received by the
  // user, used to unlock the AddToBag operation.
  authCode?: string;
};

export type PostBagItem = (
  id: Bag['id'] | null,
  data: PostBagItemData,
  query?: PostBagItemQuery,
  config?: Config,
) => Promise<Bag>;
