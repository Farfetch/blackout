import type { CheckoutOrder } from './checkoutOrder.types';
import type { CheckoutOrderOperation } from './checkoutOrderOperation.types';
import type { Config } from '../../types';

export type GetCheckoutOrderOperation = (
  checkoutOrderId: CheckoutOrder['id'],
  operationId: CheckoutOrderOperation['id'],
  config?: Config,
) => Promise<CheckoutOrderOperation>;
