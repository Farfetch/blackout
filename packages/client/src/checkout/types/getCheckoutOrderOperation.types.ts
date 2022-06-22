import type { CheckoutOrderOperation } from './checkoutOrderOperation.types';
import type { Config } from '../../types';

export type GetCheckoutOrderOperationParams = {
  /** Universal identifier of the checkout order */
  orderId: number;
  /** Universal identifier of the checkout order operation */
  operationId: CheckoutOrderOperation['id'];
};

export type GetCheckoutOrderOperation = (
  params: GetCheckoutOrderOperationParams,
  config?: Config,
) => Promise<CheckoutOrderOperation>;
