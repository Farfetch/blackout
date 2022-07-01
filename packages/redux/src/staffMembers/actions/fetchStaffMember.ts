import { fetchStaffMemberFactory } from './factories';
import { getStaffMember } from '@farfetch/blackout-client';

/**
 * Fetches staff member with the given id.
 */

export default fetchStaffMemberFactory(getStaffMember);
