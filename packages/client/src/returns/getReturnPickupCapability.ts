import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetReturnPickupCapability } from './types/index.js';

/**
 * Obtains the pickup capability for a specific return and pickup day.
 *
 * @param id - Return identifier.
 * @param pickupDay - Day of the pickup. Format YYYY-MM-DD.
 * @param config - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns Promise that will resolve when the call to
 * the endpoint finishes.
 */
const getReturnPickupCapability: GetReturnPickupCapability = (
  returnId,
  pickupDay,
  config?,
) =>
  client
    .get(
      join('/account/v1/returns/', returnId, 'pickupcapabilities/', pickupDay),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getReturnPickupCapability;
