import * as actionTypes from '../actionTypes';

/**
 * @callback GetStaffMemberThunkFactory
 *
 * @alias GetStaffMemberThunkFactory
 * @memberof module:staffMembers/actions
 *
 * @param {string} id - Staff member identifier.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for retrieving staff member based on an id.
 *
 * @function fetchStaffMember
 * @memberof module:staffMembers/actions
 *
 * @param {Function} getStaffMember - Get staff member client.
 *
 * @returns {GetStaffMemberThunkFactory} Thunk factory.
 */
export default getStaffMember => (id, config) => async dispatch => {
  dispatch({
    type: actionTypes.FETCH_STAFF_MEMBER_REQUEST,
    meta: { id },
  });

  try {
    const result = await getStaffMember(id, config);

    dispatch({
      type: actionTypes.FETCH_STAFF_MEMBER_SUCCESS,
      payload: { result },
      meta: { id },
    });
  } catch (error) {
    dispatch({
      type: actionTypes.FETCH_STAFF_MEMBER_FAILURE,
      payload: { error },
      meta: { id },
    });

    throw error;
  }
};
