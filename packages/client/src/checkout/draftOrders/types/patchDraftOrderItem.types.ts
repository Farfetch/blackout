import type { Config, Metadata } from '../../../types/index.js';
import type { DraftOrder } from './draftOrder.types.js';
import type { DraftOrderItem } from './draftOrderItem.types.js';

export type PatchDraftOrderItemData = {
  quantity: number;
  metadata: Metadata;
};

export type PatchDraftOrderItem = (
  draftOrderId: DraftOrder['id'],
  itemId: DraftOrderItem['id'],
  data: PatchDraftOrderItemData,
  config?: Config,
) => Promise<number>;
