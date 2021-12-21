import { fetchProgramsFactory } from './factories';
import { getPrograms } from '@farfetch/blackout-client/loyalty';

/**
 * Load programs.
 *
 * @memberof module:loyalty/actions
 *
 * @name fetchPrograms
 *
 * @type {FetchProgramUsersThunkFactory}
 */
export default fetchProgramsFactory(getPrograms);
