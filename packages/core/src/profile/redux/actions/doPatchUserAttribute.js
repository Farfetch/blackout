import {
  PATCH_USER_ATTRIBUTE_FAILURE,
  PATCH_USER_ATTRIBUTE_REQUEST,
  PATCH_USER_ATTRIBUTE_SUCCESS,
} from '../actionTypes';

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
 * @memberof module:profile/actions
 *
 * @param {Function} patchUserAttribute - Update a specific user attribute.
 *
 * @returns {PatchUserAttributeThunkFactory} Thunk factory.
 */
export default patchUserAttribute =>
  (userId, attributeId, data, config) =>
  async dispatch => {
    dispatch({
      type: PATCH_USER_ATTRIBUTE_REQUEST,
    });

    try {
      const result = await patchUserAttribute(
        userId,
        attributeId,
        data,
        config,
      );

      dispatch({
        type: PATCH_USER_ATTRIBUTE_SUCCESS,
        payload: result,
      });
    } catch (error) {
      dispatch({
        payload: { error },
        type: PATCH_USER_ATTRIBUTE_FAILURE,
      });

      throw error;
    }
  };
