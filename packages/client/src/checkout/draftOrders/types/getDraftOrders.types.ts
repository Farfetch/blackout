import type { Config, PagedResponseWithPageSize } from '../../../index.js';
import type { DraftOrder, DraftOrdersQuery } from '../types/index.js';

export type GetDraftOrders = (
  query: DraftOrdersQuery,
  config?: Config,
) => Promise<PagedResponseWithPageSize<DraftOrder>>;
