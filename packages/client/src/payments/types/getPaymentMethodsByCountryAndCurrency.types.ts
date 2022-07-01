import type { Config } from '../../types';
import type { PaymentMethods } from '.';

export type GetPaymentMethodsByCountryAndCurrency = (
  config?: Config,
) => Promise<PaymentMethods[]>;
