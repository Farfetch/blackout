import { fetchContactFactory } from './factories';
import { getContact } from '@farfetch/blackout-client/users';

/**
 * Fetch contact from user.
 *
 * @memberof module:users/actions
 *
 * @function fetchContact
 *
 * @type {FetchContactThunkFactory}
 */
export default fetchContactFactory(getContact);
