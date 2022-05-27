import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetOperation } from './types/getOperation.types';

/**
 * @typedef {object} GetOperationParams
 *
 * @alias GetOperationParams
 * @memberof module:checkout
 *
 * @property {number} orderId - Universal identifier of the order
 * @property {string} operationId - Universal identifier of the order operation
 */

/**
 * Method responsible for fetching all the changes that occurred during the operation.
 *
 * @function getOperation
 * @memberof module:checkout
 *
 * @param {GetOperationParams} params - Fetch params.
 * @param {object} [config] - Custom configurations to send to the client instance (axios).
 *
 * @returns {Promise<object>} Promise that will resolve when the call to the endpoint finishes.
 */
const getOperation: GetOperation = ({ orderId, operationId }, config) =>
  client
    .get(join('checkout/v1/orders', orderId, 'operations', operationId), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
export default getOperation;
