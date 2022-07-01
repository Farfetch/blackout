import { postValidateEmail } from '@farfetch/blackout-client';
import { validateEmailFactory } from './factories';

/**
 * Method responsible for validating the user's e-mail, activating the account.
 */
export default validateEmailFactory(postValidateEmail);
