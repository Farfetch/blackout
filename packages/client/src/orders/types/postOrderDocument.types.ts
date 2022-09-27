import type { Config } from '../../types';
import type { Order } from './order.types';
import type { OrderDocument, OrderDocumentType } from './orderDocuments.types';

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
