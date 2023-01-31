import { adaptDate } from '../../helpers/adapters';
import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

export const adaptDateFormat = value => `/Date(${adaptDate(value)})/`;

export const adaptResponse = response => ({
  items: {
    ...response,
    entries: response?.entries.map(entry => ({
      ...entry,
      createdDate: adaptDateFormat(entry?.createdDate),
    })),
  },
});
/**
 * Method responsible for fetching orders.
 *
 * @function getOrders
 * @memberof module:orders/client
 * @param {object} props - Props containing query and user id, or simply the query object (old behaviour).
 * @param {object} props.query - Query parameters to apply for fetching orders.
 * @param {object} props.userId - The current user id.
 * @param props
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (props, config) => {
  const containsUserId = !!props?.userId;
  const args = containsUserId
    ? [
        join('/account/v1/users/', props?.userId, 'orders', {
          query: props?.query,
        }),
        config,
      ]
    : [join('/legacy/v1/orders/', { query: props }), config];

  return client
    .get(...args)
    .then(response =>
      containsUserId ? adaptResponse(response?.data) : response?.data,
    )
    .catch(error => {
      throw adaptError(error);
    });
};
