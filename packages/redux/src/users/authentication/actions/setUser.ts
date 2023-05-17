import { putUser } from '@farfetch/blackout-client';
import { setUserFactory } from './factories/index.js';

/**
 * Updates the user data.
 */
export default setUserFactory(putUser);
