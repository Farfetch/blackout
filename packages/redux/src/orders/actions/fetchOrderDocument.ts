import { fetchOrderDocumentFactory } from './factories';
import { getOrderDocument } from '@farfetch/blackout-client/orders';

/**
 * Fetch a specific document of a certain order.
 */
export const fetchOrderDocument = fetchOrderDocumentFactory(getOrderDocument);
