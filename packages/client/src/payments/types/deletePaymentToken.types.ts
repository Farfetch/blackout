import type { Config } from '../../types/index.js';
import type { PaymentToken } from './index.js';

export type DeletePaymentToken = (
  paymentTokenId: PaymentToken['id'],
  config?: Config,
) => Promise<number>;
