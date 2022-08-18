import type { CollectPoint } from '.';
import type { Config } from '../../types';

export type GetCollectPointsQuery = {
  orderId?: number;
  IsStockAvailable?: boolean;
  IsClickAndCollectAvailable?: boolean;
};

export type GetCollectPoints = (
  query?: GetCollectPointsQuery,
  config?: Config,
) => Promise<CollectPoint[]>;
