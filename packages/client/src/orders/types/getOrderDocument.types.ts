import type { Config, Order, OrderDocument } from '../../index.js';

export type GetOrderDocument = (
  id: Order['id'],
  documentId: OrderDocument['id'],
  config?: Config,
) => Promise<string>;
