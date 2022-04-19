import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * @typedef {object} TimeWindow
 *
 * @property {string} start - Start date of the pickup reschedule request.
 * @property {string} end - End date of the pickup reschedule request.
 */

/**
 * @typedef {object} Data
 *
 * @property {string} id - Identifier.
 * @property {TimeWindow} timeWindow - Time window of the pickup reschedule request.
 * @property {string} status - Status of the request.
 */

/**
 * Method responsible for creating a pickup reschedule request.
 *
 * @function postPickupRescheduleRequests
 * @memberof module:returns/client
 *
 * @param {string} id - Return identifier.
 * @param {Data} data - Reschedule request data.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (id, data, config) =>
  client
    .post(
      join('/account/v1/returns', id, '/pickupRescheduleRequests'),
      data,
      config,
    )
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });
