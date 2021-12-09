import {
  GET_USER_ATTRIBUTES_FAILURE,
  GET_USER_ATTRIBUTES_REQUEST,
  GET_USER_ATTRIBUTES_SUCCESS,
} from '../actionTypes';

/**
 * @typedef {object} GetUserAttributesQuery
 * @property {string} channelCode - Channel code.
 * @property {string} type - Possible value: Castle, Generic,
 * AddressPredictionProvider, FarfetchLogin.
 */

/**
 * @callback GetUserAttributesThunkFactory
 * @param {string} id - The user's id.
 * @param {GetUserAttributesQuery} [query] - Query parameters for fetching user attributes.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Get user attributes from user.
 *
 * @function doGetUserAttributes
 * @memberof module:profile/actions
 *
 * @param {Function} getUserAttributes - Get user attributes client.
 *
 * @returns {GetUserAttributesThunkFactory} Thunk factory.
 */
export default getUserAttributes => (id, query, config) => async dispatch => {
  dispatch({
    type: GET_USER_ATTRIBUTES_REQUEST,
  });

  try {
    const result = await getUserAttributes(id, query, config);

    dispatch({
      payload: result,
      type: GET_USER_ATTRIBUTES_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: GET_USER_ATTRIBUTES_FAILURE,
    });

    throw error;
  }
};
