import {
  PATCH_PERSONAL_ID_FAILURE,
  PATCH_PERSONAL_ID_REQUEST,
  PATCH_PERSONAL_ID_SUCCESS,
} from '../actionTypes';

/**
 * @callback PatchPersonalIdThunkFactory
 * @param {number} userId - User identifier.
 * @param {string} personalId - Alphanumeric identifier of the personal id.
 * @param {object} data - Data to update a specific personal id.
 * @param {object} config - Custom configurations to send to the client
 * instance (axios). X-SUMMER-RequestId header is required.
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Updates a specific personal id.
 *
 * @function doPatchPersonalId
 * @memberof module:profile/actions
 *
 * @param {Function} patchPersonalId - Patch personal id client.
 *
 * @returns {PatchPersonalIdThunkFactory} Thunk factory.
 */
export default patchPersonalId =>
  (userId, personalId, data, config) =>
  async dispatch => {
    dispatch({
      type: PATCH_PERSONAL_ID_REQUEST,
    });

    try {
      const result = await patchPersonalId(userId, personalId, data, config);

      dispatch({
        type: PATCH_PERSONAL_ID_SUCCESS,
        payload: result,
      });
    } catch (error) {
      dispatch({
        payload: { error },
        type: PATCH_PERSONAL_ID_FAILURE,
      });

      throw error;
    }
  };
