import { fetchUserCreditFactory } from './factories';
import { getUserCredit } from '@farfetch/blackout-client';

/**
 * Fetch user credit balance.
 */
export const fetchUserCredit = fetchUserCreditFactory(getUserCredit);
