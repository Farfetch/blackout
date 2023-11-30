import type { CheckoutOrder } from '../../index.js';
import type { Config } from '../../../types/index.js';
import type { DraftOrder } from './draftOrder.types.js';

export type PostDraftOrdersData = {
  orderId: CheckoutOrder['id'];
  customerId?: string;
  paymentMethods?: string[];
};

export type PostDraftOrders = (
  data: PostDraftOrdersData,
  config?: Config,
) => Promise<DraftOrder>;
