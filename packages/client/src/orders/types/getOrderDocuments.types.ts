import type { Config, Order } from '../../index.js';
import type {
  OrderDocument,
  OrderDocumentType,
} from './orderDocuments.types.js';

export type GetOrderDocuments = (
  id: Order['id'],
  types: OrderDocumentType[],
  config?: Config,
) => Promise<OrderDocument[]>;
