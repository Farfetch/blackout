import {
  DELETE_PERSONAL_ID_FAILURE,
  DELETE_PERSONAL_ID_REQUEST,
  DELETE_PERSONAL_ID_SUCCESS,
} from '../actionTypes';

/**
 * @callback DeletePersonalIdThunkFactory
 * @param {number} userId - The user's id.
 * @param {string} personalId - Alphanumeric identifier of the personal id.
 * @param {object} config - Custom configurations to send to the client
 * instance (axios). X-SUMMER-RequestId header is required.
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Delete a personal id.
 *
 * @function doDeletePersonalId
 * @memberof module:profile/actions
 *
 * @param {Function} deletePersonalId - Delete personal id client.
 *
 * @returns {DeletePersonalIdThunkFactory} Thunk factory.
 */
export default deletePersonalId =>
  (userId, personalId, config) =>
  async dispatch => {
    dispatch({
      type: DELETE_PERSONAL_ID_REQUEST,
    });

    try {
      await deletePersonalId(userId, personalId, config);

      dispatch({
        type: DELETE_PERSONAL_ID_SUCCESS,
      });
    } catch (error) {
      dispatch({
        payload: { error },
        type: DELETE_PERSONAL_ID_FAILURE,
      });

      throw error;
    }
  };
