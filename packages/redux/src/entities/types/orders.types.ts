import type { Order, OrderSummary } from '@farfetch/blackout-client';
import type { OrderItemEntity } from './orderItems.types';
import type { ReturnOptionsEntity } from './returnOptions.types';

export type OrderNormalized = Omit<Order, 'items' | 'createdDate'> & {
  items: Array<OrderItemEntity['id']>;
  createdDate: number | null;
  updatedDate: number | null;
};

export type OrderSummarySemiNormalized = Omit<OrderSummary, 'createdDate'> & {
  createdDate: number | null;
  totalItems: OrderSummary['totalQuantity'];
  byMerchant: Record<OrderMerchant['merchant']['id'], OrderMerchant>;
};

export type OrderSummaryNormalized = Omit<
  OrderSummarySemiNormalized,
  'byMerchant'
> & {
  byMerchant: Record<
    OrderMerchantNormalized['merchant'],
    OrderMerchantNormalized
  >;
};

export type OrderEntity = (OrderNormalized | OrderSummaryNormalized) &
  Pick<OrderSummaryNormalized, 'totalItems' | 'byMerchant'>;

export type OrderMerchant = Omit<
  Partial<OrderSummary>,
  'id' | 'merchantId' | 'createdDate' | 'merchantName'
> & {
  merchant: {
    id: OrderSummary['merchantId'];
    name: OrderSummary['merchantName'];
  };
  orderItems?: OrderItemEntity['id'][];
  returnOptions?: ReturnOptionsEntity['id'][];
};

export type OrderMerchantNormalized = Omit<OrderMerchant, 'merchant'> & {
  merchant: OrderSummary['merchantId'];
};
