import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { GetCheckoutOrderOperation } from './types/getCheckoutOrderOperation.types';

/**
 * Method responsible for fetching all the changes that occurred during the
 * operation.
 *
 * @param params - Fetch params.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getCheckoutOrderOperation: GetCheckoutOrderOperation = (
  { orderId, operationId },
  config,
) =>
  client
    .get(join('checkout/v1/orders', orderId, 'operations', operationId), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getCheckoutOrderOperation;
