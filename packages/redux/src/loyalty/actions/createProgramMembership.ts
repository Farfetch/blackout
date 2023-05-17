import { createProgramMembershipFactory } from './factories/index.js';
import { postProgramMembership } from '@farfetch/blackout-client';

/**
 * Create program membership.
 */
export default createProgramMembershipFactory(postProgramMembership);
