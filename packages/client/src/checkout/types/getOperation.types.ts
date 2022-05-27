import type { CheckoutOrderOperation } from './checkoutOrderOperation.types';
import type { Config } from '../../types';

export type GetOperationParams = {
  orderId: number;
  operationId: CheckoutOrderOperation['id'];
};

export type GetOperation = (
  params: GetOperationParams,
  config?: Config,
) => Promise<CheckoutOrderOperation>;
