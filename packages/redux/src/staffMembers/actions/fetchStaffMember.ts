import { fetchStaffMemberFactory } from './factories/index.js';
import { getStaffMember } from '@farfetch/blackout-client';

/**
 * Fetches staff member with the given id.
 */

export default fetchStaffMemberFactory(getStaffMember);
