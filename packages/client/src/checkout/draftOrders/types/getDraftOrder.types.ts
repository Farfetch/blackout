import type { Config } from '../../../index.js';
import type { DraftOrder, DraftOrdersQuery } from '../types/index.js';

export type GetDraftOrder = (
  draftOrderId: DraftOrder['id'],
  query: DraftOrdersQuery,
  config?: Config,
) => Promise<DraftOrder>;
