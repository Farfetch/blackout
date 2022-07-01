import type { Config } from '../../types';
import type { PaymentMethods } from '.';

export type GetPaymentMethodsByIntent = (
  id: string,
  config?: Config,
) => Promise<PaymentMethods>;
