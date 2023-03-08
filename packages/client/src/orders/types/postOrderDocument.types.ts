import type { Config } from '../../types/index.js';
import type { Order } from './order.types.js';
import type {
  OrderDocument,
  OrderDocumentType,
} from './orderDocuments.types.js';

export type PostOrderDocument = (
  id: Order['id'],
  documentId: OrderDocument['id'],
  data: DocumentData,
  config?: Config,
) => Promise<string>;

export enum OrderDocumentRequestAction {
  SendToCustomer = 'SendToCustomer',
}

export type DocumentData = {
  action: OrderDocumentRequestAction;
  documentTypes: OrderDocumentType[];
};
