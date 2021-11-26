/**
 * @module staffMembers/selectors
 * @category Staff Members
 * @subcategory Selectors
 */

import { getError, getIsLoading, getResult } from './reducer';
import type { Error } from '@farfetch/blackout-client/types';
import type { StaffMember } from '@farfetch/blackout-client/staffMembers/types';
import type { StoreState } from '../types';

/**
 * Checks if a staff member is loading.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} id - The staff member identifier.
 *
 * @returns {(object | undefined)} Staff member error.
 */
export const getStaffMemberError = (
  state: StoreState,
  id: StaffMember['id'],
): Error | undefined => getError(state.staffMembers)?.[id];

/**
 * Checks if staff member is loading.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} id - The staff member identifier.
 *
 * @returns {boolean|undefined} If the staff member is loading or not.
 */
export const isStaffMemberLoading = (
  state: StoreState,
  id: StaffMember['id'],
): boolean | undefined => getIsLoading(state.staffMembers)?.[id];

/**
 * Gets a staff member.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} id - The staff member identifier.
 *
 * @returns {object|undefined} The staff member.
 */
export const getStaffMember = (
  state: StoreState,
  id: StaffMember['id'],
): StaffMember | undefined => getResult(state.staffMembers)?.[id];
