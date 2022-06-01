import { createProgramMembershipFactory } from './factories';
import { postProgramMembership } from '@farfetch/blackout-client/loyalty';

/**
 * Create program membership.
 */
export default createProgramMembershipFactory(postProgramMembership);
