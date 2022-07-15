import { addOrderDocumentFactory } from './factories';
import { postOrderDocument } from '@farfetch/blackout-client/orders';

/**
 * Add a specific document of a certain order.
 */
export const addOrderDocument = addOrderDocumentFactory(postOrderDocument);
