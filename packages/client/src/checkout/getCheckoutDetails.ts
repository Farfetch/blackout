import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetCheckoutDetails } from './types';

/**
 * Method responsible for loading the checkout details. These are used for the
 * order confirmation.
 *
 * @param id     - Universal identifier of the Checkout.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getCheckoutDetails: GetCheckoutDetails = (id, config) =>
  client
    .get(join('/checkout/v1/orders/', id, 'details'), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getCheckoutDetails;
