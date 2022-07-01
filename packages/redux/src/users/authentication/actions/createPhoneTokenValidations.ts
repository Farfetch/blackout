import { createPhoneTokenValidationsFactory } from './factories';
import { postPhoneTokenValidation } from '@farfetch/blackout-client';

/**
 * Validate the user's phone number with a phone token.
 */
export default createPhoneTokenValidationsFactory(postPhoneTokenValidation);
