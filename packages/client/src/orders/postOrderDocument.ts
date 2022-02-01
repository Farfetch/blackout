import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { PostOrderDocument } from './types';

/**
 * @typedef {object} PostOrderDocumentData
 *
 * @alias PostOrderDocumentData
 * @memberof module:orders/client
 *
 * @property {string} action - The action to be executed within the request. (Ex: SendToCustomer).
 * @property {Array} documentTypes - A list of document types. (Ex: ['ComercialInvoice']).
 */

/**
 * Method responsible for requesting a document to be sent to one of the user contacts.
 *
 * @function postOrderDocument
 * @memberof module:orders/client
 *
 * @param {string} id - The identifier of the order.
 * @param {string} documentId - TThe identifier of the document.
 * @param {PostOrderDocumentData} data - Request data.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
const postOrderDocument: PostOrderDocument = (id, documentId, data, config) =>
  client
    .post(join('/account/v1/orders', id, 'documents', documentId), data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default postOrderDocument;
