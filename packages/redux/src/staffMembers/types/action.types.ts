import type * as actionTypes from '../actionTypes';
import type { Action } from 'redux';
import type { BlackoutError } from '@farfetch/blackout-client';
import type { StaffMember } from '@farfetch/blackout-client/staffMembers/types';

export interface FetchStaffMemberFailureAction extends Action {
  meta: { id: StaffMember['id'] };
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_STAFF_MEMBER_FAILURE;
}

export interface FetchStaffMemberRequestAction extends Action {
  meta: { id: StaffMember['id'] };
  type: typeof actionTypes.FETCH_STAFF_MEMBER_REQUEST;
}

export interface FetchStaffMemberSuccessAction extends Action {
  meta: { id: StaffMember['id'] };
  payload: { result: StaffMember };
  type: typeof actionTypes.FETCH_STAFF_MEMBER_SUCCESS;
}

export type FetchStaffMemberAction =
  | FetchStaffMemberFailureAction
  | FetchStaffMemberRequestAction
  | FetchStaffMemberSuccessAction;
