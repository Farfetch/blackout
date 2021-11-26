import { createUserImpersonationFactory } from './factories';
import { postUserImpersonation } from '@farfetch/blackout-client/authentication';

/**
 * Creates user impersonation.
 *
 * @memberof module:authentication/actions
 *
 * @function createUserImpersonation
 *
 * @type {PostUserImpersonationThunkFactory}
 */
export default createUserImpersonationFactory(postUserImpersonation);
