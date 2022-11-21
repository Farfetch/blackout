import {
  GET_GUEST_USER_BENEFITS_FAILURE,
  GET_GUEST_USER_BENEFITS_REQUEST,
  GET_GUEST_USER_BENEFITS_SUCCESS,
} from '../actionTypes';

/**
 * @callback GetGuestUserBenefitsThunkFactory
 * @param {string} id - The user's id.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Get guest user benefits from user.
 *
 * @function doGetGuestUserBenefits
 * @memberof module:profile/actions
 *
 * @param {Function} getGuestUserBenefits - Get guest user benefits client.
 *
 * @returns {GetGuestUserBenefitsThunkFactory} Thunk factory.
 */
export default getGuestUserBenefits => (id, config) => async dispatch => {
  dispatch({
    type: GET_GUEST_USER_BENEFITS_REQUEST,
  });

  try {
    const result = await getGuestUserBenefits(id, config);

    dispatch({
      payload: result,
      type: GET_GUEST_USER_BENEFITS_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: GET_GUEST_USER_BENEFITS_FAILURE,
    });

    throw error;
  }
};
