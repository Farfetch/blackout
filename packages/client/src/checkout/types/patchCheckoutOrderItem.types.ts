import type { CheckoutOrder } from './checkoutOrder.types.js';
import type { CheckoutOrderItem } from './checkoutOrderItem.types.js';
import type { Config } from '../../types/index.js';
import type { Controls } from '../../types/common/controls.types.js';

export type PatchCheckoutOrderItemData = {
  /** Checkout order item quantity */
  quantity: number;
};

export type PatchCheckoutOrderItem = (
  checkoutOrderId: CheckoutOrder['id'],
  itemId: CheckoutOrderItem['id'],
  data: PatchCheckoutOrderItemData,
  config?: Config,
) => Promise<number | Controls>;
