import { getError, getIsLoading, getResult } from './reducer';
import type { StaffMember } from '@farfetch/blackout-client';
import type { StaffMembersState } from './types';
import type { StoreState } from '../types';

/**
 * Checks if a staff member is loading.
 *
 * @param state - Application state.
 * @param id    - The staff member identifier.
 *
 * @returns Staff member error.
 */
export const getStaffMemberError = (state: StoreState, id: StaffMember['id']) =>
  getError(state.staffMembers as StaffMembersState)?.[id];

/**
 * Checks if staff member is loading.
 *
 * @param state - Application state.
 * @param id    - The staff member identifier.
 *
 * @returns If the staff member is loading or not.
 */
export const isStaffMemberLoading = (
  state: StoreState,
  id: StaffMember['id'],
) => getIsLoading(state.staffMembers as StaffMembersState)?.[id];

/**
 * Gets a staff member.
 *
 * @param state - Application state.
 * @param id    - The staff member identifier.
 *
 * @returns The staff member.
 */
export const getStaffMember = (state: StoreState, id: StaffMember['id']) =>
  getResult(state.staffMembers as StaffMembersState)?.[id];
