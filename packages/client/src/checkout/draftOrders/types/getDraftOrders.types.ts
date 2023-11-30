import type { Config } from '../../../index.js';
import type { DraftOrder, DraftOrdersQuery } from '../types/index.js';

export type GetDraftOrders = (
  query: DraftOrdersQuery,
  config?: Config,
) => Promise<DraftOrder[]>;
