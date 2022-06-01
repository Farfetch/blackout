import { fetchProgramUsersMembershipFactory } from './factories';
import { getProgramUsersMembership } from '@farfetch/blackout-client/loyalty';

/**
 * Load program membership statements.
 */
export default fetchProgramUsersMembershipFactory(getProgramUsersMembership);
