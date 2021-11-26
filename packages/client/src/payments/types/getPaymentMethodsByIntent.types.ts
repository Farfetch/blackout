import type { Config } from '../../types';
import type { PaymentMethod } from '.';

export type GetPaymentMethodsByIntent = (
  id: string,
  config?: Config,
) => Promise<PaymentMethod>;
