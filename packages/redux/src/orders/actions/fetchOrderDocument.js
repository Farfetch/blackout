import { fetchOrderDocumentFactory } from './factories';
import { getOrderDocument } from '@farfetch/blackout-client/orders';

/**
 * Fetch a specific document of a certain order.
 *
 * @memberof module:orders/actions
 *
 * @name getOrderDocument
 *
 * @type {GetOrderDocumentThunkFactory}
 */
export default fetchOrderDocumentFactory(getOrderDocument);
