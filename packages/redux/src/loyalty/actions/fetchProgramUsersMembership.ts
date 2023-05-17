import { fetchProgramUsersMembershipFactory } from './factories/index.js';
import { getProgramUsersMembership } from '@farfetch/blackout-client';

/**
 * Load program membership statements.
 */
export default fetchProgramUsersMembershipFactory(getProgramUsersMembership);
