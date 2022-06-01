import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetOrderDocument } from './types';

/**
 * Method responsible for fetching a specific document of a certain order.
 *
 * @param id         - The identifier of the order.
 * @param documentId - TThe identifier of the document.
 * @param config     - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getOrderDocument: GetOrderDocument = (id, documentId, config) =>
  client
    .get(join('/account/v1/orders', id, 'documents', documentId), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getOrderDocument;
