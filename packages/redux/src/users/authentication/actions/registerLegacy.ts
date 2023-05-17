import { postUserLegacy } from '@farfetch/blackout-client';
import { registerLegacyFactory } from './factories/index.js';

/**
 * Performs the legacy register operation for a new user.
 */
export default registerLegacyFactory(postUserLegacy);
