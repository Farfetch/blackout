import type { CheckoutOrder, CollectPoint } from './index.js';
import type { Config } from '../../types/index.js';

export type GetCollectPointsQuery = {
  orderId?: CheckoutOrder['id'];
  isStockAvailable?: boolean;
  isClickAndCollectAvailable?: boolean;
};

export type GetCollectPoints = (
  query?: GetCollectPointsQuery,
  config?: Config,
) => Promise<CollectPoint[]>;
