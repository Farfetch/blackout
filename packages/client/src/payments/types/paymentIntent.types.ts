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
  amount: {
    total: number;
    items: number;
    shipping: number;
    paid: number;
    remaining: number;
  };
  clientId: string;
  currency: string;
  dateCreated: string;
  dueDate: string;
  status: PaymentIntentStatus;
  /** @deprecated use amount.total field instead */
  totalValue?: number;
  /** @deprecated total value formatted price will be removed soon */
  totalValueFormattedPrice?: string;
  /** @deprecated use amount.shipping field instead */
  totalShippingFee?: number;
  /** @deprecated formatted total shipping fee will be removed soon */
  formattedTotalShippingFee?: string;
  lineItems: {
    id: string;
    /** @deprecated use metadata.productId field instead */
    productId?: string;
    classification: PaymentIntentLineItemClassification;
    type: PaymentIntentLineItemType;
    /** @deprecated use lineItems.totalValue field instead */
    unitValue?: number;
    /** @deprecated formatted unit value will be removed soon */
    formattedUnitValue?: string;
    totalValue: number;
    totalDiscount: number;
    totalTaxes: number;
    quantity: number;
    /** @deprecated use lineItems.totalTaxes field instead */
    totalExtraTaxes?: number;
    /** @deprecated formatted total extra taxes will be removed soon */
    formattedTotalExtraTaxes?: string;
    description: string;
    metadata: {
      productId?: string;
      productVariantId?: string;
      productVariantDescription?: string;
      productBrandName?: string;
      productImageUrl?: string;
    };
  }[];
  locale: string;
  receiver: {
    firstName: string;
    lastName: string;
    email: string;
    address: PaymentAddress;
  };
  fingerprint: string;
};
