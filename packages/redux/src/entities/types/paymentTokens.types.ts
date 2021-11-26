import type { PaymentToken } from '@farfetch/blackout-client/payments/types';

export type PaymentTokensEntity =
  | Record<PaymentToken['id'], PaymentToken>
  | undefined;
