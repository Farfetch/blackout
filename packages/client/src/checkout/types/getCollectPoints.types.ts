import type { CheckoutOrder, CollectPoint } from '.';
import type { Config } from '../../types';

export type GetCollectPointsQuery = {
  orderId?: CheckoutOrder['id'];
  isStockAvailable?: boolean;
  isClickAndCollectAvailable?: boolean;
};

export type GetCollectPoints = (
  query?: GetCollectPointsQuery,
  config?: Config,
) => Promise<CollectPoint[]>;
