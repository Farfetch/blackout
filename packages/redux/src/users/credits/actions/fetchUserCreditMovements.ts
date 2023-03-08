import { fetchUserCreditMovementsFactory } from './factories/index.js';
import { getUserCreditMovements } from '@farfetch/blackout-client';

/**
 * Fetch user credit movements.
 */
export default fetchUserCreditMovementsFactory(getUserCreditMovements);
