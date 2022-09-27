import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { GetReturnPickupRescheduleRequest } from './types';

/**
 * Obtains a specific pickup reschedule request.
 *
 * @param returnId            - Return identifier.
 * @param rescheduleRequestId - Reschedule request identifier.
 * @param config              - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getReturnPickupRescheduleRequest: GetReturnPickupRescheduleRequest = (
  returnId,
  rescheduleRequestId,
  config?,
) =>
  client
    .get(
      join(
        '/account/v1/returns/',
        returnId,
        'pickupRescheduleRequests/',
        rescheduleRequestId,
      ),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getReturnPickupRescheduleRequest;
