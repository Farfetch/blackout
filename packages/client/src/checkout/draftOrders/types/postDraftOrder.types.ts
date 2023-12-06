import type { CheckoutOrder } from '../../index.js';
import type { Config } from '../../../types/index.js';
import type { DraftOrder } from './draftOrder.types.js';

export type PostDraftOrderData = {
  orderId: CheckoutOrder['id'];
  customerId?: string;
  paymentMethods?: string[];
};

export type PostDraftOrder = (
  data: PostDraftOrderData,
  config?: Config,
) => Promise<DraftOrder>;
