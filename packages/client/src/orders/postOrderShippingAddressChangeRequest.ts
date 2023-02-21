import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { PostOrderShippingAddressChangeRequest } from './types/index.js';

/**
 * Method responsible for creating the shipping address change request of the order.
 *
 * @param orderId - The orderID to get the details.
 * @param data - Request data.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const postOrderShippingAddressChangeRequest: PostOrderShippingAddressChangeRequest =
  (orderId, data, config) =>
    client
      .post(
        join('/account/v1/orders', orderId, 'shippingAddressChangeRequests'),
        data,
        config,
      )
      .then(response => response.status)
      .catch(error => {
        throw adaptError(error);
      });

export default postOrderShippingAddressChangeRequest;
