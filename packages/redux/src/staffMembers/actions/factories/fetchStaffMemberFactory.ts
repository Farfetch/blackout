import * as actionTypes from '../../actionTypes';
import type { Dispatch } from 'redux';
import type { FetchStaffMemberAction } from '../../types';
import type {
  GetStaffMember,
  StaffMember,
} from '@farfetch/blackout-client/staffMembers/types';

/**
 * @callback FetchStaffMemberThunkFactory
 *
 * @alias FetchStaffMemberThunkFactory
 * @memberof module:staffMembers/actions/factories
 *
 * @param {string} id - Staff member identifier.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified
 * client to fetch a staff member based on an id.
 *
 * @function fetchStaffMember
 * @memberof module:staffMembers/actions/factories
 *
 * @param {Function} getStaffMember - Get staff member client.
 *
 * @returns {FetchStaffMemberThunkFactory} Thunk factory.
 */
const fetchStaffMemberFactory =
  (getStaffMember: GetStaffMember) =>
  (id: StaffMember['id'], config?: Record<string, unknown>) =>
  async (dispatch: Dispatch<FetchStaffMemberAction>): Promise<StaffMember> => {
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

      return result;
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_STAFF_MEMBER_FAILURE,
        payload: { error },
        meta: { id },
      });

      throw error;
    }
  };

export default fetchStaffMemberFactory;
