import type { CheckoutSessionItem } from './checkoutSessionItem.types.js';
import type { PaymentMethods } from '../../payments/types/paymentMethods.types.js';

export enum CheckoutSessionType {
  Checkout,
  Payment,
}

export type CheckoutSessionMetadata = Record<string, string>;

export type CheckoutSession = {
  id: string;
  type: CheckoutSessionType;
  successUrl: string;
  cancelUrl: string;
  email?: string;
  country: string;
  currency: string;
  language: string;
  tenantId: number;
  clientId: number;
  isGuest: boolean;
  userId: number;
  orderId: number;
  grandTotal: number;
  subTotalAmount: number;
  subTotalAmountExclTaxes: number;
  totalDiscount: number;
  totalShippingFee: number;
  totalTaxes: number;
  totalDomesticTaxes: number;
  taxType: string;
  metadata?: CheckoutSessionMetadata;
  items: CheckoutSessionItem[];
  paymentMethods: PaymentMethods;
};
