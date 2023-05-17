import type { Order, OrderItem } from '../../orders/index.js';
import type { PaymentIntent } from '../../payments/index.js';
import type { ProductResult, ProductVariant } from '../../products/index.js';
import type { Return } from '../../returns/index.js';

export type Exchange = {
  id: string;
  status: ExchangeStatus;
  exchangeOrder: ExchangeOrder;
  customer: { id: number | null };
  exchangeGroups: Array<ExchangeGroup>;
  createdDate: string;
  updatedDate: string | null;
};

export enum ExchangeStatus {
  Draft = 'Draft',
  PendingOrderConfirmation = 'PendingOrderConfirmation',
  Booked = 'Booked',
  ProcessingOrderPayment = 'ProcessingOrderPayment',
  PendingOrderDelivery = 'PendingOrderDelivery',
  Cancelled = 'Cancelled',
  Completed = 'Completed',
}

export type ExchangeOrder = {
  // This specific checkoutOrderId is a string on purpose (usually it is a number).
  checkoutOrderId: string;
  orderId: Order['id'];
  payment: { intentId: PaymentIntent['id'] };
};

export type ExchangeGroup = {
  exchangeReturnItems: Array<ExchangeReturnItem>;
  exchangeItems: Array<ExchangeItem>;
};

export type ExchangeReturnItem = {
  id: string;
  orderCode: Order['id'];
  orderItemUuid: OrderItem['shippingOrderLineId'];
  returnId?: Return['id'] | null;
};

export type ExchangeItem = {
  product: ExchangeProduct;
};

export type ExchangeProduct = {
  id: ProductResult['id'];
  variantId: ProductVariant['id'];
  merchantId: OrderItem['merchantId'];
};
