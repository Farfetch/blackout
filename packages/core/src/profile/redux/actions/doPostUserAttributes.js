import {
  POST_USER_ATTRIBUTES_FAILURE,
  POST_USER_ATTRIBUTES_REQUEST,
  POST_USER_ATTRIBUTES_SUCCESS,
} from '../actionTypes';

/**
 * @typedef {object} PostUserAttributesData
 * @property {string} channelCode - Channel code.
 * @property {string} type - Possible value: Generic, Referral.
 * @property {number} userId - Identifier of the user.
 * @property {object} details - New user attributes details.
 */

/**
 * @callback PostUserAttributesThunkFactory
 * @param {string} userId - User id.
 * @param {PostUserAttributesData} data - User attributes object.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for creating an user attribute.
 *
 * @function doPostUserAttributes
 * @memberof module:profile/actions
 *
 * @param {Function} postUserAttributes - Post user attribute client.
 *
 * @returns {PostUserAttributesThunkFactory} Thunk factory.
 */
export default postUserAttributes =>
  (userId, data, config) =>
  async dispatch => {
    dispatch({
      type: POST_USER_ATTRIBUTES_REQUEST,
    });

    try {
      const result = await postUserAttributes(userId, data, config);

      dispatch({
        type: POST_USER_ATTRIBUTES_SUCCESS,
        payload: result,
      });
    } catch (error) {
      dispatch({
        payload: { error },
        type: POST_USER_ATTRIBUTES_FAILURE,
      });

      throw error;
    }
  };
