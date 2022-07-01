import { fetchOrderDocumentFactory } from './factories';
import { getOrderDocument } from '@farfetch/blackout-client';

/**
 * Fetch a specific document of a certain order.
 */
export default fetchOrderDocumentFactory(getOrderDocument);
