import type { Config } from '../../types';
import type { PaymentToken } from '.';

export type DeletePaymentToken = (
  paymentTokenId: PaymentToken['id'],
  config?: Config,
) => void;
