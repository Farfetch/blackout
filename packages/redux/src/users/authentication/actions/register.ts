import { postRegister } from '@farfetch/blackout-client';
import { registerFactory } from './factories';

/**
 * Performs the register operation for a new user.
 */
export default registerFactory(postRegister);
