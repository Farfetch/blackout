import {
  POST_PERSONAL_IDS_FAILURE,
  POST_PERSONAL_IDS_REQUEST,
  POST_PERSONAL_IDS_SUCCESS,
} from '../actionTypes';

/**
 * @callback PostPersonalIdsThunkFactory
 * @param {string} id - Universal identifier of the user.
 * @param {object} data - Object containing personal id data.
 * @param {object} config - Custom configurations to send to the client
 * instance (axios). X-SUMMER-RequestId header is required.
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for creating a personal ids.
 *
 * @function doPostPersonalIds
 * @memberof module:profile/actions
 *
 * @param {Function} postPersonalIds - Post personal ids client.
 *
 * @returns {PostPersonalIdsThunkFactory} Thunk factory.
 */
export default postPersonalIds => (id, data, config) => async dispatch => {
  dispatch({
    type: POST_PERSONAL_IDS_REQUEST,
  });

  try {
    const result = await postPersonalIds(id, data, config);

    dispatch({
      payload: result,
      type: POST_PERSONAL_IDS_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: POST_PERSONAL_IDS_FAILURE,
    });

    throw error;
  }
};
