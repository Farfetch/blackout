import type { Config } from '../../types';
import type { Order } from './order.types';
import type { OrderItem } from './orderItem.types';
import type { OrderItemActivityType } from './getOrderAvailableItemsActivities.types';

export type PostOrderItemActivity = (
  id: Order['id'],
  itemId: OrderItem['id'],
  data: PostOrderItemActivityData,
  config?: Config,
) => Promise<number>;

export type PostOrderItemActivityData = {
  type: OrderItemActivityType;
};
