import {
  GET_PERSONAL_ID_FAILURE,
  GET_PERSONAL_ID_REQUEST,
  GET_PERSONAL_ID_SUCCESS,
} from '../actionTypes';

/**
 * @callback GetPersonalIdThunkFactory
 * @param {number} userId - User identifier.
 * @param {string} personalId - Alphanumeric identifier of the personal id.
 * @param {object} config - Custom configurations to send to the client
 * instance (axios). X-SUMMER-RequestId header is required.
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Gets the personal id.
 *
 * @function doGetPersonalId
 * @memberof module:profile/actions
 *
 * @param {Function} getPersonalId - Get personal id client.
 *
 * @returns {GetPersonalIdThunkFactory} Thunk factory.
 */
export default getPersonalId =>
  (userId, personalId, config) =>
  async dispatch => {
    dispatch({
      type: GET_PERSONAL_ID_REQUEST,
    });

    try {
      const result = await getPersonalId(userId, personalId, config);

      dispatch({
        payload: result,
        type: GET_PERSONAL_ID_SUCCESS,
      });
    } catch (error) {
      dispatch({
        payload: { error },
        type: GET_PERSONAL_ID_FAILURE,
      });

      throw error;
    }
  };
