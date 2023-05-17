import { addOrderDocumentFactory } from './factories/index.js';
import { postOrderDocument } from '@farfetch/blackout-client';

/**
 * Add a specific document of a certain order.
 */
export default addOrderDocumentFactory(postOrderDocument);
