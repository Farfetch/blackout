import { fetchStaffMemberFactory } from './factories';
import { getStaffMember } from '@farfetch/blackout-client/staffMembers';

/**
 * Fetches staff member with the given id.
 *
 * @memberof module:staffMembers/actions
 *
 * @function fetchBrands
 *
 * @type {FetchStaffMemberThunkFactory}
 */

export default fetchStaffMemberFactory(getStaffMember);
