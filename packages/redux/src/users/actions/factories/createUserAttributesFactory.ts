import {
  CREATE_USER_ATTRIBUTES_FAILURE,
  CREATE_USER_ATTRIBUTES_REQUEST,
  CREATE_USER_ATTRIBUTES_SUCCESS,
} from '../../actionTypes';
import type { Dispatch } from 'redux';
import type {
  PostUserAttributes,
  UserAttributesData,
  UserAttributesResponse,
} from '@farfetch/blackout-client/users/types';

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
 * @memberof module:users/actions
 *
 * @param {Function} postUserAttributes - Post user attribute client.
 *
 * @returns {PostUserAttributesThunkFactory} Thunk factory.
 */
const createUserAttributesFactory =
  (postUserAttributes: PostUserAttributes) =>
  (
    userId: number,
    data: UserAttributesData,
    config?: Record<string, unknown>,
  ) =>
  async (dispatch: Dispatch): Promise<UserAttributesResponse> => {
    dispatch({
      type: CREATE_USER_ATTRIBUTES_REQUEST,
    });

    try {
      const result = await postUserAttributes(userId, data, config);

      dispatch({
        type: CREATE_USER_ATTRIBUTES_SUCCESS,
        payload: result,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: CREATE_USER_ATTRIBUTES_FAILURE,
      });

      throw error;
    }
  };

export default createUserAttributesFactory;
