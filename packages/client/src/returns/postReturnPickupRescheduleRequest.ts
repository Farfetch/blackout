import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { PostReturnPickupRescheduleRequest } from './types';

/**
 * Method responsible for creating pickup reschedule requests.
 *
 * @param returnId     - Return identifier.
 * @param data   - Request data.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const postReturnPickupRescheduleRequest: PostReturnPickupRescheduleRequest = (
  returnId,
  data,
  config?,
) =>
  client
    .post(
      join('/account/v1/returns', returnId, 'pickupRescheduleRequests/'),
      data,
      config,
    )
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });

export default postReturnPickupRescheduleRequest;
