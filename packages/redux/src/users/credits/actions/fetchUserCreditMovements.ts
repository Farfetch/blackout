import { fetchUserCreditMovementsFactory } from './factories';
import { getUserCreditMovements } from '@farfetch/blackout-client';

/**
 * Fetch user credit movements.
 */
export default fetchUserCreditMovementsFactory(getUserCreditMovements);
