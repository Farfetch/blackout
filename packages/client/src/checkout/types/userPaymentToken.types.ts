import type { FlatAddress } from '.';

export type UserPaymentToken = {
  id: string;
  paymentMethodId: string;
  userId: string;
  cardLast4Numbers: string;
  expiryYear: number;
  expiryMonth: number;
  holderName: string;
  forceCvvRequest: boolean;
  billingAddress: FlatAddress;
  tokenExpired: boolean;
  usedDate: string;
  createdDate: string;
  paymentOption: string;
};
