import type { Config } from '../../types';
import type { PaymentMethods } from '.';

export type GetPaymentMethods = (
  id: number,
  config?: Config,
) => Promise<PaymentMethods>;
