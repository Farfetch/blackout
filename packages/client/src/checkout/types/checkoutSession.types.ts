import type {
  CheckoutAddress,
  CheckoutShippingAddress,
  ClickAndCollect,
  Controls,
} from '../../index.js';
import type { CheckoutSessionItem } from './checkoutSessionItem.types.js';

export enum CheckoutSessionType {
  Checkout,
  Payment,
}

export enum CheckoutSessionOrderStatus {
  NoError,
  AddressesError,
  ShippingOptionsError,
  DeliveryBundleError,
  Recovered,
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
  checkoutOrderId: number;
  orderId?: string;
  orderStatus: CheckoutSessionOrderStatus;
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
  shippingAddress?: CheckoutShippingAddress;
  billingAddress?: CheckoutAddress;
  clickAndCollect?: ClickAndCollect;
  promotionEvaluationId?: string;
  totalCredit?: number;
  promocode?: string;
  customerId: number;
} & Controls;
