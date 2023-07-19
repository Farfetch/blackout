import type { Config, Controls } from '../../types/index.js';

export type DeleteCheckoutOrderItem = (
  checkoutOrderId: number,
  itemId: number,
  config?: Config,
) => Promise<number | Controls>;
