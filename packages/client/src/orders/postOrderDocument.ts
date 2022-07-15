import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { PostOrderDocument } from './types';

/**
 * Method responsible for requesting a document to be sent to one of the user
 * contacts.
 *
 * @param id         - The identifier of the order.
 * @param documentId - TThe identifier of the document.
 * @param data       - Request data.
 * @param config     - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
export const postOrderDocument: PostOrderDocument = (
  id,
  documentId,
  data,
  config,
) =>
  client
    .post(join('/account/v1/orders', id, 'documents', documentId), data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
