import type { Exchange } from '../../index.js';
import type { OrderItem } from '../../orders/index.js';

export enum ReturnItemStatus {
  Created = 'Created',
  AcceptedWithShippingCosts = 'AcceptedWithShippingCosts',
  AcceptedWithoutShippingCosts = 'AcceptedWithoutShippingCosts',
  Contested = 'Contested',
  ContestAccepted = 'ContestAccepted',
  Canceled = 'Canceled',
}

export type ReturnItem = {
  id: number;
  orderItemId: OrderItem['id'];
  reason: string;
  description?: string;
  status: ReturnItemStatus;
  exchangeId?: Exchange['id'];
  itemStatus: {
    code: string;
  };
};

export type PostReturnItemData = Omit<
  ReturnItem,
  'id' | 'status' | 'itemStatus'
>;
