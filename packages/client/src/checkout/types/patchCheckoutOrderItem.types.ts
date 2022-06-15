import type { Config } from '../../types';

export type PatchCheckoutOrderItemData = {
  /** Checkout order item quantity */
  quantity: number;
};

export type PatchCheckoutOrderItem = (
  checkoutOrderId: number,
  itemId: number,
  data: PatchCheckoutOrderItemData,
  config?: Config,
) => Promise<number>;
