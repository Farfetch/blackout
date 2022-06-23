import { createUserImpersonationFactory } from './factories';
import { postUserImpersonation } from '@farfetch/blackout-client';

/**
 * Creates user impersonation.
 */
export default createUserImpersonationFactory(postUserImpersonation);
