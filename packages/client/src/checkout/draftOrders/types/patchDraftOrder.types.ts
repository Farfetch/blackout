import type { Config, Metadata } from '../../../types/index.js';
import type { DraftOrder } from './draftOrder.types.js';

export type DraftOrderData = {
  metadata: Metadata;
};

export type PatchDraftOrder = (
  id: DraftOrder['id'],
  data?: DraftOrderData,
  config?: Config,
) => Promise<number>;
