import type {
  Config,
  Order,
  OrderItem,
  OrderItemActivities,
} from '../../index.js';

export type GetOrderItemAvailableActivities = (
  id: Order['id'],
  itemId: OrderItem['id'],
  config?: Config,
) => Promise<OrderItemActivities[]>;
