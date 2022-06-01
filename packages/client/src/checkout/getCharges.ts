import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetCharges } from './types';

/**
 * Method responsible for getting the orderCharge.
 *
 * @param id     - Id of the checkout order.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getCharges: GetCharges = (id, config) =>
  client
    .get(join('/checkout/v1/orders', id, 'charges'), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getCharges;
