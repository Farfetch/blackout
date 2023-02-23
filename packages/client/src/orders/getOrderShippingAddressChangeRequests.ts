import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { GetOrderShippingAddressChangeRequests } from './types';

/**
 * Method responsible for fetching the requests to change the shipping address of the order.
 *
 * @param orderId - The orderID to get the requests.
 * @param config  - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getOrderShippingAddressChangeRequests: GetOrderShippingAddressChangeRequests =
  (orderId, config) =>
    client
      .get(
        join('/account/v1/orders', orderId, 'shippingAddressChangeRequests'),
        config,
      )
      .then(response => response.data)
      .catch(error => {
        throw adaptError(error);
      });

export default getOrderShippingAddressChangeRequests;
