import { postPasswordRecover } from '@farfetch/blackout-client';
import { recoverPasswordFactory } from './factories/index.js';

/**
 * Method responsible for sending an email for the user to reset the password.
 */
export default recoverPasswordFactory(postPasswordRecover);
