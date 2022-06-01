import { fetchProgramsFactory } from './factories';
import { getPrograms } from '@farfetch/blackout-client/loyalty';

/**
 * Load programs.
 */
export default fetchProgramsFactory(getPrograms);
