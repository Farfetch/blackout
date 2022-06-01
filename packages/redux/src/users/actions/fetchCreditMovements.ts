import { fetchCreditMovementsFactory } from './factories';
import { getCreditMovements } from '@farfetch/blackout-client/users';

/**
 * Fetch user credit movements.
 */
export default fetchCreditMovementsFactory(getCreditMovements);
