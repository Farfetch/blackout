import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';

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
 * @param {object} props - Props object.
 * @param {string} props.orderId - The identifier of the order.
 * @param {string} props.fileId - TThe identifier of the document.
 * @param {PostOrderDocumentData} data - Request data.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default ({ orderId, fileId }, data, config) =>
  client
    .post(
      join('/account/v1/orders', orderId, 'documents', fileId),
      data,
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
