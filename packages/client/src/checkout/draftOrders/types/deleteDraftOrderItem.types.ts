import type { Config } from '../../../types/index.js';
import type { DraftOrder } from './draftOrder.types.js';
import type { DraftOrderItem } from './draftOrderItem.types.js';

export type DeleteDraftOrderItem = (
  draftOrderId: DraftOrder['id'],
  itemId: DraftOrderItem['id'],
  config?: Config,
) => Promise<number>;
