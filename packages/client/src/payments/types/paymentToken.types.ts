import type { City, Country, State } from '.';

export type PaymentToken = {
  id: string;
  paymentMethodId: string;
  userId: string;
  cardLast4Numbers: string;
  expiryYear: number;
  expiryMonth: number;
  holderName: string;
  forceCvvRequest: boolean;
  billingAddress: {
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    city: City;
    country: Country;
    ddd: string;
    firstName: string;
    id: string;
    lastName: string;
    neighbourhood: string;
    phone: string;
    state: State;
    vatNumber: string;
    zipCode: string;
    userId: number;
    isDefaultBillingAddress: boolean;
    isDefaultShippingAddress: boolean;
  };
  tokenExpired: boolean;
  usedDate: string;
  createdDate: string;
  paymentOption: string;
};
