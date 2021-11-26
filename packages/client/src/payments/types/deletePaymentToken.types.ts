import type { Config } from '../../types';
import type { PaymentToken } from '.';

export type DeletePaymentToken = (
  id: PaymentToken['id'],
  config?: Config,
) => void;
