import { createProgramMembershipFactory } from './factories';
import { postProgramMembership } from '@farfetch/blackout-client';

/**
 * Create program membership.
 */
export default createProgramMembershipFactory(postProgramMembership);
