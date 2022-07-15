import { fetchOrderDocumentsFactory } from './factories';
import { getOrderDocuments } from '@farfetch/blackout-client/orders';

/**
 * Fetch the documents of the respective order.
 */
export const fetchOrderDocuments =
  fetchOrderDocumentsFactory(getOrderDocuments);
