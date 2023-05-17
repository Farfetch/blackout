import type { Config } from '../../types/index.js';
import type { PaymentMethods } from './index.js';

export type GetPaymentMethodsByCountryAndCurrency = (
  config?: Config,
) => Promise<PaymentMethods[]>;
