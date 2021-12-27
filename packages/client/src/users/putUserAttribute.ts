import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { PutUserAttribute } from './types';

/**
 * @typedef {object} UserAttributesDetailsGeneric
 * @property {object} items - Items with key value pair, ie: "key1": "value1".
 */

/**
 * @typedef {object} UserAttributesDetailsReferral
 * @property {string} referralToken - Token.
 * @property {string} rewardsCardNumber - Rewards card number.
 * @property {boolean} joinRewards - Join rewards.
 */

/**
 * @typedef {object} PutUserAttributesData
 * @property {string} channelCode - Channel code.
 * @property {string} type - Possible value: Generic, Referral.
 * @property {number} userId - Identifier of the user.
 * @property {UserAttributesDetailsGeneric|UserAttributesDetailsReferral} details - New user attributes details.
 */

/**
 * Method responsible for updating specific user attribute.
 *
 * @function putUserAttribute
 * @memberof module:users/client
 *
 * @param {number} userId - User's id to be filtered for.
 * @param {string} attributeId - The attribute id to be filtered for.
 * @param {PutUserAttributesData} data - User attributes object.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
const putUserAttribute: PutUserAttribute = (
  userId,
  attributeId,
  data,
  config,
) =>
  client
    .put(
      join('/account/v1/users/', userId, '/attributes', attributeId),
      data,
      config,
    )
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });

export default putUserAttribute;
