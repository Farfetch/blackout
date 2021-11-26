import type { Bag } from './bag.types';
import type { Product } from '../../products/types';
import type { Query } from './query.types';

export type PostBagItemData = {
  productId: Product['result']['id'];
  productAggregatorId?: number;
  merchantId?: number;
  quantity?: number;
  size: number;
  scale: number;
  customAttributes?: string;
  authCode?: string;
};

export type PostBagItem = (
  id: Bag['id'] | null,
  data: PostBagItemData,
  query?: Query,
  config?: Record<string, unknown>,
) => Promise<Bag>;
