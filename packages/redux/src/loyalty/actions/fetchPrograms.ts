import { fetchProgramsFactory } from './factories';
import { getPrograms } from '@farfetch/blackout-client';

/**
 * Load programs.
 */
export default fetchProgramsFactory(getPrograms);
