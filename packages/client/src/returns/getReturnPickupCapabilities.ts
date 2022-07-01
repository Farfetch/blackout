import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { GetReturnPickupCapabilities } from './types';

/**
 * Obtains the pickup capabilities for a specific order.
 *
 * @param id - Return identifier.
 * @param pickupDay - Day of the pickup. Format YYYY-MM-DD.
 * @param config - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns Promise that will resolve when the call to
 * the endpoint finishes.
 */
const getReturnPickupCapabilities: GetReturnPickupCapabilities = (
  id,
  pickupDay,
  config?,
) =>
  client
    .get(
      join('/account/v1/returns/', id, 'pickupcapabilities/', pickupDay),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getReturnPickupCapabilities;
