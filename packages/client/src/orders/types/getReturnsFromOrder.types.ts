import type { Query, Return } from '../../returns/types';

export type GetOrderReturns = (
  id: string,
  query?: Query,
  config?: Record<string, unknown>,
) => Promise<Return>;
