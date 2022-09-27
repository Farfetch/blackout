import type { Config, Order, OrderItem } from '../..';

export enum OrderItemActivityType {
  None = 'None',
  Cancel = 'Cancel',
  ConfirmDelivery = 'ConfirmDelivery',
}

export type OrderItemActivity = {
  type: OrderItemActivityType;
};

export type OrderItemActivities = {
  itemId: OrderItem['id'];
  activities: OrderItemActivity[];
};

export type GetOrderAvailableItemsActivities = (
  id: Order['id'],
  config?: Config,
) => Promise<OrderItemActivities[]>;
