import {
  GET_USER_ATTRIBUTE_FAILURE,
  GET_USER_ATTRIBUTE_REQUEST,
  GET_USER_ATTRIBUTE_SUCCESS,
} from '../actionTypes';

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
 * @memberof module:profile/actions
 *
 * @param {Function} getUserAttribute - Get a specific attribute client.
 *
 * @returns {GetUserAttributeThunkFactory} Thunk factory.
 */
export default getUserAttribute =>
  (id, attributeId, config) =>
  async dispatch => {
    dispatch({
      type: GET_USER_ATTRIBUTE_REQUEST,
    });

    try {
      const result = await getUserAttribute(id, attributeId, config);

      dispatch({
        payload: result,
        type: GET_USER_ATTRIBUTE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        payload: { error },
        type: GET_USER_ATTRIBUTE_FAILURE,
      });

      throw error;
    }
  };
