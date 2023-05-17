import { fetchOrderDocumentsFactory } from './factories/index.js';
import { getOrderDocuments } from '@farfetch/blackout-client';

/**
 * Fetch the documents of the respective order.
 */
export default fetchOrderDocumentsFactory(getOrderDocuments);
