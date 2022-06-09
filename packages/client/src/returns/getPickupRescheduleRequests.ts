import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetPickupRescheduleRequests } from './types';

/**
 * Obtains the pickup reschedule requests.
 *
 * @param id     - Return identifier.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getPickupRescheduleRequests: GetPickupRescheduleRequests = (id, config) =>
  client
    .get(join('/account/v1/returns/', id, 'pickupRescheduleRequests/'), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getPickupRescheduleRequests;
