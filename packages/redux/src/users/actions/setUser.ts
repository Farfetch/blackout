import { putUser } from '@farfetch/blackout-client/users';
import { setUserFactory } from './factories';

/**
 * Updates the user data.
 */
export default setUserFactory(putUser);
