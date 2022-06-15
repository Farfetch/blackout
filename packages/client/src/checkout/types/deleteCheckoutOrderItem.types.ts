import type { Config } from '../../types';

export type DeleteCheckoutOrderItem = (
  checkoutOrderId: number,
  itemId: number,
  config?: Config,
) => Promise<number>;
