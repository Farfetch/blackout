import type { PaymentToken } from '@farfetch/blackout-client';

export type PaymentTokensEntity =
  | Record<PaymentToken['id'], PaymentToken>
  | undefined;
