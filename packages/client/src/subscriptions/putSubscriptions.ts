import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import type { PutSubscriptions } from './types';

/**
 * Method responsible for putting data to subscriptions endpoint on MKT API.
 *
 * @param data   - Payload to be sent on the body of the put request.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise object.
 */
const putSubscriptions: PutSubscriptions = (data, config) =>
  client
    .put('/marketing/v1/subscriptions', data, config)
    .then(() => undefined)
    .catch(error => {
      throw adaptError(error);
    });

export default putSubscriptions;
