import { addOrderDocumentFactory } from './factories';
import { postOrderDocument } from '@farfetch/blackout-client/orders';

/**
 * Add a specific document of a certain order.
 *
 * @memberof module:orders/actions
 *
 * @name addOrderDocument
 *
 * @type {AddOrderDocumentThunkFactory}
 */
export default addOrderDocumentFactory(postOrderDocument);
