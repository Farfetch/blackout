import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { PostPickupRescheduleRequest } from './types';

/**
 * Method responsible for creating pickup reschedule requests.
 *
 * @param id - Return identifier.
 * @param data - Request data.
 * @param config - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns Promise that will resolve when the call to
 * the endpoint finishes.
 */
const postPickupRescheduleRequest: PostPickupRescheduleRequest = (
  id,
  data,
  config,
) =>
  client
    .post(
      join('/account/v1/returns', id, 'pickupRescheduleRequests/'),
      data,
      config,
    )
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });

export default postPickupRescheduleRequest;
