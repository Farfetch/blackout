import { fetchContactsFactory } from './factories';
import { getContacts } from '@farfetch/blackout-client/users';

/**
 * Fetch all the contacts from user.
 *
 * @memberof module:users/actions
 *
 * @function fetchContacts
 *
 * @type {FetchContactsThunkFactory}
 */
export default fetchContactsFactory(getContacts);
