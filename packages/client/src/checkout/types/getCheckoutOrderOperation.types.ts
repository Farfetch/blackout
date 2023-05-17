import type { CheckoutOrder } from './checkoutOrder.types.js';
import type { CheckoutOrderOperation } from './checkoutOrderOperation.types.js';
import type { Config } from '../../types/index.js';

export type GetCheckoutOrderOperation = (
  checkoutOrderId: CheckoutOrder['id'],
  operationId: CheckoutOrderOperation['id'],
  config?: Config,
) => Promise<CheckoutOrderOperation>;
