import type { PaymentTokenBillingAddress } from '../../types/common/address.types.js';

export type PaymentToken = {
  id: string;
  paymentMethodId: string;
  userId: string;
  cardLast4Numbers: string;
  expiryYear: number;
  expiryMonth: number;
  holderName: string;
  forceCvvRequest: boolean;
  billingAddress: PaymentTokenBillingAddress;
  tokenExpired: boolean;
  usedDate: string;
  createdDate: string;
  paymentOption: string;
  providerToken: string;
};
