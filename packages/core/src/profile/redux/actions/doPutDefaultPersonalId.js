import {
  PUT_DEFAULT_PERSONAL_ID_FAILURE,
  PUT_DEFAULT_PERSONAL_ID_REQUEST,
  PUT_DEFAULT_PERSONAL_ID_SUCCESS,
} from '../actionTypes';

/**
 * @callback PutDefaultPersonalIdThunkFactory
 * @param {number} id - Universal identifier of the user.
 * @param {object} data - Object containing personal id data.
 * @param {object} config - Custom configurations to send to the client
 * instance (axios). X-SUMMER-RequestId header is required.
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for updateing a default personal id.
 *
 * @function doPutDefaultPersonalId
 * @memberof module:profile/actions
 *
 * @param {Function} putDefaultPersonalId - Update default personal id client.
 *
 * @returns {PutDefaultPersonalIdThunkFactory} Thunk factory.
 */
export default putDefaultPersonalId => (id, data, config) => async dispatch => {
  dispatch({
    type: PUT_DEFAULT_PERSONAL_ID_REQUEST,
  });

  try {
    const result = await putDefaultPersonalId(id, data, config);

    dispatch({
      payload: result,
      type: PUT_DEFAULT_PERSONAL_ID_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: PUT_DEFAULT_PERSONAL_ID_FAILURE,
    });

    throw error;
  }
};
