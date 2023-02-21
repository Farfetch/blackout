import * as actionTypes from '../../actionTypes';
import {
  type Config,
  type GetStaffMember,
  type StaffMember,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { FetchStaffMemberAction } from '../../types';

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
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        type: actionTypes.FETCH_STAFF_MEMBER_FAILURE,
        payload: { error: errorAsBlackoutError },
        meta: { id },
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchStaffMemberFactory;
