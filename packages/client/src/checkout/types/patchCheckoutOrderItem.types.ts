import type { CheckoutOrder } from './checkoutOrder.types';
import type { CheckoutOrderItem } from './checkoutOrderItem.types';
import type { Config } from '../../types';

export type PatchCheckoutOrderItemData = {
  /** Checkout order item quantity */
  quantity: number;
};

export type PatchCheckoutOrderItem = (
  checkoutOrderId: CheckoutOrder['id'],
  itemId: CheckoutOrderItem['id'],
  data: PatchCheckoutOrderItemData,
  config?: Config,
) => Promise<number>;
