import type { MerchantEntity } from './merchant.types';
import type {
  Order,
  OrderLegacy,
  Orders,
  OrderSummary,
} from '@farfetch/blackout-client';
import type {
  OrderItemEntity,
  OrderItemEntityDenormalized,
} from './orderItems.types';
import type {
  ReturnOptionEntity,
  ReturnOptionEntityDenormalized,
} from './returnOptions.types';

export type OrderNormalized = Omit<
  Order | OrderLegacy,
  'items' | 'createdDate' | 'updatedDate'
> & {
  items: Array<OrderItemEntity['id']>;
  createdDate: number | null;
  updatedDate: number | null;
} & OrderSummaryNormalized;

export type OrderSummaryNormalized = {
  id: OrderSummary['id'];
  createdDate: number | null;
  totalItems: OrderSummary['totalQuantity'];
  byMerchant: Record<
    MerchantOrderNormalized['merchant'],
    MerchantOrderNormalized
  >;
};

export type OrderEntity = OrderSummaryNormalized & Partial<OrderNormalized>;

export type MerchantOrderNormalized = Omit<
  Partial<OrderSummary>,
  'id' | 'merchantId' | 'createdDate' | 'merchantName'
> & {
  merchant: OrderSummary['merchantId'];
  orderItems?: OrderItemEntity['id'][];
  returnOptions?: ReturnOptionEntity['id'][];
};

export type MerchantOrderDenormalized = Omit<
  MerchantOrderNormalized,
  'merchant' | 'orderItems' | 'returnOptions'
> & {
  merchant?: MerchantEntity;
  orderItems?: OrderItemEntityDenormalized[];
  returnOptions?: ReturnOptionEntityDenormalized[];
};

export type OrdersNormalized = Omit<Orders, 'entries'> & {
  entries: Array<OrderSummaryNormalized['id']>;
};

export type OrdersDenormalized = Omit<OrdersNormalized, 'entries'> & {
  entries: OrderEntityDenormalized[];
};

export type OrderEntityDenormalized = Omit<
  OrderEntity,
  'byMerchant' | 'items'
> & {
  byMerchant: Record<
    MerchantOrderNormalized['merchant'],
    MerchantOrderDenormalized
  >;
  items?: OrderItemEntityDenormalized[];
};
