import { createProgramMembershipFactory } from './factories';
import { postProgramMembership } from '@farfetch/blackout-client/loyalty';

/**
 * Create program membership.
 *
 * @memberof module:loyalty/actions
 *
 * @name createProgramMembership
 *
 * @type {CreateProgramMembershipThunkFactory}
 */
export default createProgramMembershipFactory(postProgramMembership);
