import {
  DELETE_USER_ATTRIBUTE_FAILURE,
  DELETE_USER_ATTRIBUTE_REQUEST,
  DELETE_USER_ATTRIBUTE_SUCCESS,
} from '../actionTypes';

/**
 * @callback DeleteUserAttributeThunkFactory
 * @param {number} userId - User's id to be filtered for.
 * @param {string} attributeId - The attribute id to be filtered for.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Deletes a specific user attribute.
 *
 * @function doDeleteUserAttribute
 * @memberof module:profile/actions
 *
 * @param {Function} deleteUserAttribute - Delete a specific user attribute.
 *
 * @returns {DeleteUserAttributeThunkFactory} Thunk factory.
 */
export default deleteUserAttribute =>
  (userId, attributeId, config) =>
  async dispatch => {
    dispatch({
      type: DELETE_USER_ATTRIBUTE_REQUEST,
    });

    try {
      const result = await deleteUserAttribute(userId, attributeId, config);

      dispatch({
        type: DELETE_USER_ATTRIBUTE_SUCCESS,
        payload: result,
      });
    } catch (error) {
      dispatch({
        payload: { error },
        type: DELETE_USER_ATTRIBUTE_FAILURE,
      });

      throw error;
    }
  };
