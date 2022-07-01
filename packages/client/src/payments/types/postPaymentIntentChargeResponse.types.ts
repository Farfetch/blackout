import type { PaymentIntentCharge } from '.';

export type PostPaymentIntentChargeResponse = {
  data: PaymentIntentCharge;
  headers: Record<string, string>;
};
