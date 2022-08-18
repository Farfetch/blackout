import type { Config, OrderItemActivities } from '../..';

export type GetOrderItemAvailableActivities = (
  id: string,
  itemId: string,
  config?: Config,
) => Promise<OrderItemActivities[]>;
