import { fetchDefaultPersonalIdFactory } from './factories';
import { getDefaultPersonalId } from '@farfetch/blackout-client/users';

/**
 * Fetch default personal id.
 *
 * @memberof module:users/actions
 *
 * @function fetchDefaultPersonalId
 *
 * @type {FetchDefaultPersonalIdThunkFactory}
 */
export default fetchDefaultPersonalIdFactory(getDefaultPersonalId);
