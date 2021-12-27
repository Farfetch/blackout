import { fetchCreditFactory } from './factories';
import { getCredit } from '@farfetch/blackout-client/users';

/**
 * Fetch user credit balance.
 *
 * @memberof module:users/actions
 *
 * @function fetchCredit
 *
 * @type {FetchCreditThunkFactory}
 */
export default fetchCreditFactory(getCredit);
