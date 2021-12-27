import {
  FETCH_USER_ATTRIBUTE_FAILURE,
  FETCH_USER_ATTRIBUTE_REQUEST,
  FETCH_USER_ATTRIBUTE_SUCCESS,
} from '../../actionTypes';
import type { Dispatch } from 'redux';
import type {
  GetUserAttribute,
  UserAttributesResponse,
} from '@farfetch/blackout-client/users/types';

/**
 * @callback GetUserAttributeThunkFactory
 * @param {number} id - The user's id.
 * @param {string} attributeId - The attribute id.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Get a specific attribute from user.
 *
 * @function doGetUserAttribute
 * @memberof module:users/actions
 *
 * @param {Function} getUserAttribute - Get a specific attribute client.
 *
 * @returns {GetUserAttributeThunkFactory} Thunk factory.
 */
const fetchUserAttributeFactory =
  (getUserAttribute: GetUserAttribute) =>
  (id: number, attributeId: string, config?: Record<string, unknown>) =>
  async (dispatch: Dispatch): Promise<UserAttributesResponse> => {
    dispatch({
      type: FETCH_USER_ATTRIBUTE_REQUEST,
    });

    try {
      const result = await getUserAttribute(id, attributeId, config);

      dispatch({
        payload: result,
        type: FETCH_USER_ATTRIBUTE_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: FETCH_USER_ATTRIBUTE_FAILURE,
      });

      throw error;
    }
  };

export default fetchUserAttributeFactory;
