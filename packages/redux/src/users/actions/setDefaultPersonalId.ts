import { putDefaultPersonalId } from '@farfetch/blackout-client/users';
import { setDefaultPersonalIdFactory } from './factories';

/**
 * Updates the default personal id.
 *
 * @memberof module:users/actions
 *
 * @function setDefaultPersonalId
 *
 * @type {SetDefaultPersonalIdThunkFactory}
 */
export default setDefaultPersonalIdFactory(putDefaultPersonalId);
