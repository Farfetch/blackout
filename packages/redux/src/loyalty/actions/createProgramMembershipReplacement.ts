import { createProgramMembershipReplacementFactory } from './factories';
import { postProgramMembershipReplacement } from '@farfetch/blackout-client/loyalty';

/**
 * Request a new membership id by replacement.
 *
 * @memberof module:loyalty/actions
 *
 * @name createProgramMembershipReplacement
 *
 * @type {CreateProgramMembershipReplacementThunkFactory}
 */
export default createProgramMembershipReplacementFactory(
  postProgramMembershipReplacement,
);
