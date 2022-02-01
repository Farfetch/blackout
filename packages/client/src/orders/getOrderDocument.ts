import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetOrderDocument } from './types';

/**
 * Method responsible for fetching a specific document of a certain order.
 *
 * @function getOrderDocument
 * @memberof module:orders/client
 * @param {string} id - The identifier of the order.
 * @param {string} documentId - TThe identifier of the document.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
const getOrderDocument: GetOrderDocument = (id, documentId, config) =>
  client
    .get(join('/account/v1/orders', id, 'documents', documentId), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getOrderDocument;
