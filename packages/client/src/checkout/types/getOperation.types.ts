import type { CheckoutOrderOperation } from './checkoutOrderOperation.types';
import type { Config } from '../../types';

export type GetOperationParams = {
  /** Universal identifier of the checkout order */
  orderId: number;
  /** Universal identifier of the checkout order operation */
  operationId: CheckoutOrderOperation['id'];
};

export type GetOperation = (
  params: GetOperationParams,
  config?: Config,
) => Promise<CheckoutOrderOperation>;
