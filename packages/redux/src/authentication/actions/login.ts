import { loginFactory } from './factories';
import { postLogin } from '@farfetch/blackout-client/authentication';

/**
 * Performs login operation for the user.
 */
export default loginFactory(postLogin);
