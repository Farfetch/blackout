import { deleteUserImpersonation } from '@farfetch/blackout-client/authentication';
import { removeUserImpersonationFactory } from './factories';

/**
 * Deletes an user impersonation.
 */
export default removeUserImpersonationFactory(deleteUserImpersonation);
