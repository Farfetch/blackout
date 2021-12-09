import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

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
 * @typedef {object} PostUserAttributesData
 * @property {string} channelCode - Channel code.
 * @property {string} type - Possible value: Generic, Referral.
 * @property {number} userId - Identifier of the user.
 * @property {UserAttributesDetailsGeneric|UserAttributesDetailsReferral} details - New user attributes details.
 */

/**
 * Method responsible for creating new user attributes.
 *
 * @function postUserAttributes
 * @memberof module:profile/client
 *
 * @param {number} userId - User's id to set the attributes.
 * @param {PostUserAttributesData} data - User attributes object.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (userId, data, config) =>
  client
    .post(join('/account/v1/users', userId, 'attributes'), data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
