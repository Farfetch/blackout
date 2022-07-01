import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetStaffMember,
  StaffMember,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { FetchStaffMemberAction } from '../../types';

/**
 * @param id     - Staff member identifier.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client to fetch a staff
 * member based on an id.
 *
 * @param getStaffMember - Get staff member client.
 *
 * @returns Thunk factory.
 */
const fetchStaffMemberFactory =
  (getStaffMember: GetStaffMember) =>
  (id: StaffMember['id'], config?: Config) =>
  async (dispatch: Dispatch<FetchStaffMemberAction>): Promise<StaffMember> => {
    try {
      dispatch({
        type: actionTypes.FETCH_STAFF_MEMBER_REQUEST,
        meta: { id },
      });

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
        payload: { error: toBlackoutError(error) },
        meta: { id },
      });

      throw error;
    }
  };

export default fetchStaffMemberFactory;
