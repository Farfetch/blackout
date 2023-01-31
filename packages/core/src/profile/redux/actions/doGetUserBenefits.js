import {
  GET_USER_BENEFITS_FAILURE,
  GET_USER_BENEFITS_REQUEST,
  GET_USER_BENEFITS_SUCCESS,
} from '../actionTypes';

/**
 * @callback GetUserBenefitsThunkFactory
 * @param {string} id - The user's id.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Get user benefits from user.
 *
 * @function doGetUserBenefits
 * @memberof module:profile/actions
 *
 * @param {Function} getUserBenefits - Get user benefits client.
 *
 * @returns {GetUserBenefitsThunkFactory} Thunk factory.
 */
export default getUserBenefits => (id, config) => async dispatch => {
  dispatch({
    type: GET_USER_BENEFITS_REQUEST,
  });

  try {
    const result = await getUserBenefits(id, config);

    dispatch({
      payload: result,
      type: GET_USER_BENEFITS_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: GET_USER_BENEFITS_FAILURE,
    });

    throw error;
  }
};
