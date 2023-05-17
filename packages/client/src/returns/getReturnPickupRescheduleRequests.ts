import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetReturnPickupRescheduleRequests } from './types/index.js';

/**
 * Obtains the pickup reschedule requests.
 *
 * @param returnId - Return identifier.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getReturnPickupRescheduleRequests: GetReturnPickupRescheduleRequests = (
  returnId,
  config,
) =>
  client
    .get(
      join('/account/v1/returns/', returnId, 'pickupRescheduleRequests/'),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getReturnPickupRescheduleRequests;
