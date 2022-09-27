import type { Config, Order, OrderDocument } from '../..';

export type GetOrderDocument = (
  id: Order['id'],
  documentId: OrderDocument['id'],
  config?: Config,
) => Promise<string>;
