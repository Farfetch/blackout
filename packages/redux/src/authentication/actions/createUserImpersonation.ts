import { createUserImpersonationFactory } from './factories';
import { postUserImpersonation } from '@farfetch/blackout-client/authentication';

/**
 * Creates user impersonation.
 */
export default createUserImpersonationFactory(postUserImpersonation);
