import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * @typedef {object} GetReturnQuery
 *
 * @alias GetReturnQuery
 * @memberof module:returns/client
 *
 * @property {string} [guestOrderId] - Order identifier. Only required if
 * the user is not registered (guest).
 * @property {string} [guestUserEmail] - User email. Only required if
 * the user is not registered (guest).
 */

/**
 * Method responsible for obtaining a specific return.
 *
 * @function getReturn
 * @memberof module:returns/client
 *
 * @param {string} id - Return identifier.
 * @param {GetReturnQuery} query - Query parameters.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */

/**
 * Due to a change on Farfetch side regarding the way return status and return item
 * work, deprecating the existing enum objects Return.Status and Return.ReturnItem.Status,
 * we now have two new string fields for that effect -> Return.returnStatus and
 * Return.ReturnItem.itemStatus.
 *
 * ReturnStatus possible values:
 * WaitingExternalApproval, Draft, Booked, AtPartnerLocation, InTransit, ArrivedAtFinalLocation,
 * Processing, Accepted, PartiallyAccepted, Refused and Cancelled.
 *
 * ItemStatus possible values:
 * Open, Accepted, Refused and Cancelled.
 */

export default (id, query, config) =>
  client
    .get(join('/account/v1/returns', id, { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
