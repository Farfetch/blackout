import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { DeleteSubscription } from './types';

/**
 * Method responsible for sending a delete all subscriptions request to MKT API containing the subscription id and email hash of the user to be unsubscribed.
 *
 * @function deleteSubscription
 * @memberof module:subscriptions/client
 *
 * @param query - Query object.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise object.
 */

const deleteSubscription: DeleteSubscription = (query, config) => {
  return client
    .delete(join('/marketing/v1/subscriptions', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
};

export default deleteSubscription;
