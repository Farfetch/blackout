import type { Config, Order } from '../..';
import type { OrderDocument, OrderDocumentType } from './orderDocuments.types';

export type GetOrderDocuments = (
  id: Order['id'],
  types: OrderDocumentType[],
  config?: Config,
) => Promise<OrderDocument[]>;
