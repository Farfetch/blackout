/**
 * @module staffMembers/selectors
 * @category Staff Members
 * @subcategory Selectors
 */

import {
  getAreStaffMembersLoading,
  getStaffMembers,
  getStaffMembersError,
} from './reducer';

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
export const getStaffMemberError = (state, id) =>
  getStaffMembersError(state.staffMembers)?.[id];

/**
 * Checks if staff member is loading.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} id - The staff member identifier.
 *
 * @returns {boolean} If the staff member is loading or not.
 */
export const isStaffMemberLoading = (state, id) =>
  getAreStaffMembersLoading(state.staffMembers)?.[id];

/**
 * Gets a staff member.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} id - The staff member identifier.
 *
 * @returns {object} The staff member.
 */
export const getStaffMember = (state, id) =>
  getStaffMembers(state.staffMembers)?.[id];
