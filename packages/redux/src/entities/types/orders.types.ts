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
import type { ReturnEntity } from './returns.types';
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
  returnOptions?: Array<ReturnOptionEntity['id']> | null;
  returns?: Array<ReturnEntity['id']> | null;
};

export type OrderEntity = OrderSummaryNormalized & Partial<OrderNormalized>;

export type MerchantOrderNormalized = Omit<
  Partial<OrderSummary>,
  'id' | 'merchantId' | 'createdDate' | 'merchantName'
> & {
  merchant: OrderSummary['merchantId'];
  orderItems?: OrderItemEntity['id'][];
  returnOptions?: ReturnOptionEntity['id'][];
  returns?: ReturnEntity['id'][];
};

export type MerchantOrderDenormalized = Omit<
  MerchantOrderNormalized,
  'merchant' | 'orderItems' | 'returnOptions' | 'returns'
> & {
  merchant?: MerchantEntity;
  orderItems?: OrderItemEntityDenormalized[];
  returnOptions?: ReturnOptionEntityDenormalized[];
  returns?: ReturnEntity[];
};

export type OrdersNormalized = Omit<Orders, 'entries'> & {
  entries: Array<OrderSummaryNormalized['id']>;
};

export type OrdersDenormalized = Omit<OrdersNormalized, 'entries'> & {
  entries: OrderEntityDenormalized[];
};

export type OrderEntityDenormalized = Omit<
  OrderEntity,
  'byMerchant' | 'items' | 'returns' | 'returnOptions'
> & {
  byMerchant: Record<
    MerchantOrderNormalized['merchant'],
    MerchantOrderDenormalized
  >;
  items?: OrderItemEntityDenormalized[];
  returns?: ReturnEntity[] | null;
  returnOptions?: ReturnOptionEntityDenormalized[] | null;
};
