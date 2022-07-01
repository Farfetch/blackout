import type {
  AddressWithOptionalLocation,
  AddressWithRecipient,
} from '../../types/common/address.types';

export type PaymentToken = {
  id: string;
  paymentMethodId: string;
  userId: string;
  cardLast4Numbers: string;
  expiryYear: number;
  expiryMonth: number;
  holderName: string;
  forceCvvRequest: boolean;
  billingAddress: AddressWithOptionalLocation<AddressWithRecipient>;
  tokenExpired: boolean;
  usedDate: string;
  createdDate: string;
  paymentOption: string;
};
