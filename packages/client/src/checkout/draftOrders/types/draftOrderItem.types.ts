import type { Color } from '../../../index.js';
import type { Metadata } from '../../../types/index.js';

export type DraftOrderItem = {
  id: string;
  productId: number;
  merchantId: number;
  variantId?: string;
  quantity: number;
  customAttributes?: string;
  productAggregatorId?: number;
  colors?: Color[];
  metadata?: Metadata;
};
