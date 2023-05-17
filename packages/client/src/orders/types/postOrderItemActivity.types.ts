import type { Config } from '../../types/index.js';
import type { Order } from './order.types.js';
import type { OrderItem } from './orderItem.types.js';
import type { OrderItemActivityType } from './getOrderAvailableItemsActivities.types.js';

export type PostOrderItemActivity = (
  id: Order['id'],
  itemId: OrderItem['id'],
  data: PostOrderItemActivityData,
  config?: Config,
) => Promise<number>;

export type PostOrderItemActivityData = {
  type: OrderItemActivityType;
};
