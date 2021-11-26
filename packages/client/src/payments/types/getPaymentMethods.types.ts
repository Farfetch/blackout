import type { Config } from '../../types';
import type { PaymentMethod } from '.';

export type GetPaymentMethods = (
  id: number,
  config?: Config,
) => Promise<PaymentMethod>;
