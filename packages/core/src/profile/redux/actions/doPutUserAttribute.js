import {
  PUT_USER_ATTRIBUTE_FAILURE,
  PUT_USER_ATTRIBUTE_REQUEST,
  PUT_USER_ATTRIBUTE_SUCCESS,
} from '../actionTypes';

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
 * @callback PutUserAttributeThunkFactory
 * @param {number} userId - User's id to be filtered for.
 * @param {string} attributeId - The attribute id to be filtered for.
 * @param {PutUserAttributesData} data - User attributes object.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Updates a specific user attribute.
 *
 * @function doPutUserAttribute
 * @memberof module:profile/actions
 *
 * @param {Function} putUserAttribute - Update a specific user attribute.
 *
 * @returns {PutUserAttributeThunkFactory} Thunk factory.
 */
export default putUserAttribute =>
  (userId, attributeId, data, config) =>
  async dispatch => {
    dispatch({
      type: PUT_USER_ATTRIBUTE_REQUEST,
    });

    try {
      const result = await putUserAttribute(userId, attributeId, data, config);

      dispatch({
        type: PUT_USER_ATTRIBUTE_SUCCESS,
        payload: result,
      });
    } catch (error) {
      dispatch({
        payload: { error },
        type: PUT_USER_ATTRIBUTE_FAILURE,
      });

      throw error;
    }
  };
