import {
  GET_DEFAULT_PERSONAL_ID_FAILURE,
  GET_DEFAULT_PERSONAL_ID_REQUEST,
  GET_DEFAULT_PERSONAL_ID_SUCCESS,
} from '../actionTypes';

/**
 * @callback GetDefaultPersonalIdThunkFactory
 * @param {number} userId - Universal identifier of the user.
 * @param {object} config - Custom configurations to send to the client
 * instance (axios). X-SUMMER-RequestId header is required.
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Gets the default personal id.
 *
 * @function doGetDefaultPersonalId
 * @memberof module:profile/actions
 *
 * @param {Function} getDefaultPersonalId - Get default personal id client.
 *
 * @returns {GetDefaultPersonalIdThunkFactory} Thunk factory.
 */
export default getDefaultPersonalId => (userId, config) => async dispatch => {
  dispatch({
    type: GET_DEFAULT_PERSONAL_ID_REQUEST,
  });

  try {
    const result = await getDefaultPersonalId(userId, config);

    dispatch({
      payload: result,
      type: GET_DEFAULT_PERSONAL_ID_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: GET_DEFAULT_PERSONAL_ID_FAILURE,
    });

    throw error;
  }
};
