import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetPickupRescheduleRequest } from './types';

/**
 * Obtains a specific pickup reschedule request.
 *
 * @param id - Return identifier.
 * @param rescheduleRequestId - Reschedule request identifier.
 * @param config - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns Promise that will resolve when the call to
 * the endpoint finishes.
 */
const getPickupRescheduleRequest: GetPickupRescheduleRequest = (
  id,
  rescheduleRequestId,
  config,
) =>
  client
    .get(
      join(
        '/account/v1/returns/',
        id,
        'pickupRescheduleRequests/',
        rescheduleRequestId,
      ),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getPickupRescheduleRequest;
