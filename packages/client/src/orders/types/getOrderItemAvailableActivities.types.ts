import type { Config, Order, OrderItem, OrderItemActivities } from '../..';

export type GetOrderItemAvailableActivities = (
  id: Order['id'],
  itemId: OrderItem['id'],
  config?: Config,
) => Promise<OrderItemActivities[]>;
