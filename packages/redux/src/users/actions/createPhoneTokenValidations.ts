import { createPhoneTokenValidationsFactory } from './factories';
import { postPhoneTokenValidations } from '@farfetch/blackout-client/users';

/**
 * Validate the user's phone number with a phone token.
 */
export default createPhoneTokenValidationsFactory(postPhoneTokenValidations);
