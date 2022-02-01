import { fetchOrderDocumentsFactory } from './factories';
import { getOrderDocuments } from '@farfetch/blackout-client/orders';

/**
 * Fetch the documents of the respective order.
 *
 * @memberof module:orders/actions
 *
 * @name getOrderDocuments
 *
 * @type {GetOrderDocumentsThunkFactory}
 */
export default fetchOrderDocumentsFactory(getOrderDocuments);
