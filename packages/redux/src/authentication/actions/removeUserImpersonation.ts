import { deleteUserImpersonation } from '@farfetch/blackout-client/authentication';
import { removeUserImpersonationFactory } from './factories';

/**
 * Deletes an user impersonation.
 *
 * @memberof module:authentication/actions
 *
 * @function removeUserImpersonation
 *
 * @type {DeleteUserImpersonationThunkFactory}
 */
export default removeUserImpersonationFactory(deleteUserImpersonation);
