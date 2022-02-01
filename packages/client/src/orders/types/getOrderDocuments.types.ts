import type { OrderDocuments } from './orderDocuments.types';

export type GetOrderDocuments = (
  id: string,
  types: string[],
  config?: Record<string, unknown>,
) => Promise<OrderDocuments[]>;
