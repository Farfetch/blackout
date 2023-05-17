import type { PaymentAddress } from '../../types/common/address.types.js';

export enum PaymentIntentStatus {
  Created = 'Created',
  Pending = 'Pending',
  Cancelled = 'Cancelled',
  Authorized = 'Authorized',
  Settled = 'Settled',
  Refunded = 'Refunded',
}

export enum PaymentIntentLineItemClassification {
  Standard,
  Domestic,
  International,
}

export enum PaymentIntentLineItemType {
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
    classification: PaymentIntentLineItemClassification;
    type: PaymentIntentLineItemType;
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
    address: PaymentAddress;
  };
  fingerprint: string;
};
