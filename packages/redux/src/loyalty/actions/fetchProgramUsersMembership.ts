import { fetchProgramUsersMembershipFactory } from './factories';
import { getProgramUsersMembership } from '@farfetch/blackout-client/loyalty';

/**
 * Load program membership statements.
 *
 * @memberof module:loyalty/actions
 *
 * @name fetchProgramUsersMembership
 *
 * @type {FetchProgramUsersMembershipThunkFactory}
 */
export default fetchProgramUsersMembershipFactory(getProgramUsersMembership);
