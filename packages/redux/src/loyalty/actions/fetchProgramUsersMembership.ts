import { fetchProgramUsersMembershipFactory } from './factories';
import { getProgramUsersMembership } from '@farfetch/blackout-client';

/**
 * Load program membership statements.
 */
export default fetchProgramUsersMembershipFactory(getProgramUsersMembership);
