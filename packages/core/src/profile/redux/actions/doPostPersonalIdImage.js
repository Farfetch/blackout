import {
  POST_PERSONAL_ID_IMAGE_FAILURE,
  POST_PERSONAL_ID_IMAGE_REQUEST,
  POST_PERSONAL_ID_IMAGE_SUCCESS,
} from '../actionTypes';

/**
 * @callback PostPersonalIdImageThunkFactory
 * @param {number} userId - User's id to create personal id image.
 * @param {object} data - Object containing the image.
 * @param {object} config - Custom configurations to send to the client
 * instance (axios). X-SUMMER-RequestId header is required.
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Creates a personal id image.
 *
 * @function doPostPersonalIdImage
 * @memberof module:profile/actions
 *
 * @param {Function} postPersonalIdImage - Post personal id image client.
 *
 * @returns {PostPersonalIdImageThunkFactory} Thunk factory.
 */
export default postPersonalIdImage =>
  (userId, data, config) =>
  async dispatch => {
    dispatch({
      type: POST_PERSONAL_ID_IMAGE_REQUEST,
    });

    try {
      const result = await postPersonalIdImage(userId, data, config);

      dispatch({
        type: POST_PERSONAL_ID_IMAGE_SUCCESS,
        payload: result,
      });
    } catch (error) {
      dispatch({
        payload: { error },
        type: POST_PERSONAL_ID_IMAGE_FAILURE,
      });

      throw error;
    }
  };
