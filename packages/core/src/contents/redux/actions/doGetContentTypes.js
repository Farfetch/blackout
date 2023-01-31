import * as actionTypes from '../actionTypes';

/**
 * @callback GetContentTypesThunkFactory
 * @param {string} spaceCode - The space where the content belongs to (website|mobileapp|emailTool...).
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Load content types.
 *
 * @function doGetContentTypes
 * @memberof module:contents/actions
 *
 * @param {Function} fetchContentTypes - Fetch content types client.
 *
 * @returns {GetContentTypesThunkFactory} Thunk factory.
 */
export default fetchContentTypes => (spaceCode, config) => async dispatch => {
  dispatch({
    type: actionTypes.GET_CONTENT_TYPES_REQUEST,
  });

  try {
    const contentTypes = await fetchContentTypes(spaceCode, config);

    dispatch({
      payload: contentTypes.entries.map(entry => entry.code),
      type: actionTypes.GET_CONTENT_TYPES_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: actionTypes.GET_CONTENT_TYPES_FAILURE,
    });

    throw error;
  }
};
