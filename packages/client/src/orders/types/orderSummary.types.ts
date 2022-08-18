import type { PagedResponse } from '../../types';

export type Orders = PagedResponse<OrderSummary>;

export enum OrderTag {
  PreOrder = 'PreOrder',
}

export enum OrderStatus {
  Created = 'Created',
  ReviewingOrder = 'Reviewing order',
  ProcessingOrder = 'Processing order',
  OrderCancelled = 'Order cancelled',
  PreparingForShipping = 'Preparing for shipping',
  OrderInTransit = 'Order In transit',
  InTransitToStore = 'In transit to store',
  WaitingForCollection = 'Waiting for collection',
  OrderDelivered = 'Order delivered',
  ReturnStarted = 'Return started',
  ReturnInStoreProcessing = 'Return in store processing',
  ReturnWaitingForCollection = 'Return waiting for collection',
  ReturnsInTransit = 'Returns in Transit',
  ReturnReceivedAndBeingProcessed = 'Return Received and being processed',
  ReturnAcceptedAndRefunded = 'Return Accepted and Refunded',
}

export type OrderSummary = {
  id: string;
  userId: number;
  merchantId: number;
  merchantName: string;
  totalQuantity: number;
  status: OrderStatus;
  createdDate: string;
  returnAvailable: boolean;
  checkoutOrderId: number;
  returnId?: number;
  deliveryDate?: string;
  maxReturnDate?: string;
  tags: OrderTag[];
  merchantOrderCode: string;
};
