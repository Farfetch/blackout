import { fetchProgramsFactory } from './factories/index.js';
import { getPrograms } from '@farfetch/blackout-client';

/**
 * Load programs.
 */
export default fetchProgramsFactory(getPrograms);
