import type { PagedResponse } from '../../types/index.js';

export type OrderSummaries = PagedResponse<OrderSummary>;

export enum OrderTag {
  PreOrder = 'PreOrder',
  ExchangeOrder = 'ExchangeOrder',
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

export enum FpsOrderType {
  Farfetch = 'Farfetch',
  HistoricalOffline = 'HistoricalOffline',
  HistoricalOnline = 'HistoricalOnline',
  Offline = 'Offline',
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
  fpsOrderType: FpsOrderType;
};
