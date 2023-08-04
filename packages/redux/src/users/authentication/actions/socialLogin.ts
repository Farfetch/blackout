import { postSocialLogin } from '@farfetch/blackout-client';
import { socialLoginFactory } from './factories/index.js';

/**
 * Performs social login operation for the user.
 */
export default socialLoginFactory(postSocialLogin);
