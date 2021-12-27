import {
  UPDATE_USER_ATTRIBUTE_FAILURE,
  UPDATE_USER_ATTRIBUTE_REQUEST,
  UPDATE_USER_ATTRIBUTE_SUCCESS,
} from '../../actionTypes';
import type { Dispatch } from 'redux';
import type {
  PatchUserAttribute,
  PatchUserAttributeData,
} from '@farfetch/blackout-client/users/types';

/**
 * @typedef {object} UserAttributeData
 *
 * @alias UserAttributeData
 * @memberof module:profile/client
 *
 * @property {string} op - Type of operation, i.e replace.
 * @property {string} path - Path of the value to change.
 * @property {string} value - New value.
 */

/**
 * @callback PatchUserAttributeThunkFactory
 * @param {number} userId - User's id to be filtered for.
 * @param {string} attributeId - The attribute id to be filtered for.
 * @param {UserAttributeData[]} data - User attribute data.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Updates a specific user attribute.
 *
 * @function doPatchUserAttribute
 * @memberof module:users/actions
 *
 * @param {Function} patchUserAttribute - Update a specific user attribute.
 *
 * @returns {PatchUserAttributeThunkFactory} Thunk factory.
 */
const updateUserAttributeFactory =
  (patchUserAttribute: PatchUserAttribute) =>
  (
    userId: number,
    attributeId: string,
    data: PatchUserAttributeData[],
    config?: Record<string, unknown>,
  ) =>
  async (dispatch: Dispatch): Promise<number> => {
    dispatch({
      type: UPDATE_USER_ATTRIBUTE_REQUEST,
    });

    try {
      const result = await patchUserAttribute(
        userId,
        attributeId,
        data,
        config,
      );

      dispatch({
        type: UPDATE_USER_ATTRIBUTE_SUCCESS,
        payload: result,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: UPDATE_USER_ATTRIBUTE_FAILURE,
      });

      throw error;
    }
  };

export default updateUserAttributeFactory;
