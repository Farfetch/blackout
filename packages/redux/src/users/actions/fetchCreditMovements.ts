import { fetchCreditMovementsFactory } from './factories';
import { getCreditMovements } from '@farfetch/blackout-client/users';

/**
 * Fetch user credit movements.
 *
 * @memberof module:users/actions
 *
 * @function fetchCreditMovements
 *
 * @type {FetchCreditMovementsThunkFactory}
 */
export default fetchCreditMovementsFactory(getCreditMovements);
