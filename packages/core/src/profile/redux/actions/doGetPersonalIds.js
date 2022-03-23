import {
  GET_PERSONAL_IDS_FAILURE,
  GET_PERSONAL_IDS_REQUEST,
  GET_PERSONAL_IDS_SUCCESS,
} from '../actionTypes';

/**
 * @callback GetPersonalIdsThunkFactory
 * @param {number} id - Universal identifier of the user.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Gets the personal ids.
 *
 * @function doGetDefaultPersonalId
 * @memberof module:profile/actions
 *
 * @param {Function} getPersonalIds - Get personal ids client.
 *
 * @returns {GetPersonalIdsThunkFactory} Thunk factory.
 */
export default getPersonalIds => (id, config) => async dispatch => {
  dispatch({
    type: GET_PERSONAL_IDS_REQUEST,
  });

  try {
    const result = await getPersonalIds(id, config);

    dispatch({
      payload: result,
      type: GET_PERSONAL_IDS_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: GET_PERSONAL_IDS_FAILURE,
    });

    throw error;
  }
};
