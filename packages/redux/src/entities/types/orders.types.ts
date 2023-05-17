import type { MerchantEntity } from './merchant.types.js';
import type {
  Order,
  OrderLegacy,
  OrderSummaries,
  OrderSummary,
} from '@farfetch/blackout-client';
import type {
  OrderItemEntity,
  OrderItemEntityDenormalized,
} from './orderItems.types.js';

export type OrderEntity = Omit<
  Order | OrderLegacy,
  'items' | 'createdDate' | 'updatedDate'
> & {
  items: Array<OrderItemEntity['id']>;
  createdDate: number | null;
  updatedDate: number | null;
};

export type OrderSummaryEntity = Omit<OrderSummary, 'createdDate'> & {
  createdDate: number | null;
};

export type MerchantOrderNormalized = Omit<
  Partial<OrderSummary>,
  'id' | 'merchantId' | 'createdDate' | 'merchantName'
> & {
  orderItems?: OrderItemEntity['id'][];
};

export type MerchantOrderDenormalized = Omit<
  MerchantOrderNormalized,
  'merchant' | 'orderItems' | 'returnOptions' | 'returns'
> & {
  orderItems?: OrderItemEntityDenormalized[];
};

export type OrdersNormalized = Omit<Order, 'entries'> & {
  entries: Array<OrderSummary['merchantOrderCode']>;
};

export type OrdersDenormalized = Omit<OrdersNormalized, 'entries'> & {
  entries: OrderEntityDenormalized[];
};

export type OrderSummariesNormalized = Omit<OrderSummaries, 'entries'> & {
  entries: Array<OrderSummary['merchantOrderCode']>;
};

export type OrderSummaryDenormalized = OrderSummaryEntity & {
  merchant: MerchantEntity | undefined;
};

export type OrderSummariesDenormalized = Omit<OrderSummaries, 'entries'> & {
  entries: Array<OrderSummaryDenormalized>;
};

export type OrderEntityDenormalized = Omit<OrderEntity, 'items'> & {
  items?: OrderItemEntityDenormalized[];
};
