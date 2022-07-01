import { createProgramMembershipReplacementFactory } from './factories';
import { postProgramMembershipReplacement } from '@farfetch/blackout-client';

/**
 * Request a new membership id by replacement.
 */
export default createProgramMembershipReplacementFactory(
  postProgramMembershipReplacement,
);
