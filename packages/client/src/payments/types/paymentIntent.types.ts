import type { AddressBase } from '../../types/common/address.types';

export enum PaymentIntentStatus {
  Created,
  Pending,
  Cancelled,
  Authorized,
  Settled,
  Refunded,
}

export enum Classification {
  Standard,
  Domestic,
  International,
}

export enum LineItemsType {
  Item,
  Shipping,
}

export type PaymentIntent = {
  id: string;
  reference: string;
  currency: string;
  dateCreated: string;
  status: PaymentIntentStatus;
  totalValue: number;
  totalValueFormattedPrice: string;
  totalShippingFee: number;
  formattedTotalShippingFee: string;
  lineItems: {
    id: string;
    productId: string;
    classification: Classification;
    type: LineItemsType;
    unitValue: number;
    formattedUnitValue: string;
    quantity: number;
    totalExtraTaxes: number;
    formattedTotalExtraTaxes: string;
    description: string;
  }[];
  receiver: {
    firstName: string;
    lastName: string;
    email: string;
    address: AddressBase;
  };
  fingerprint: string;
};
