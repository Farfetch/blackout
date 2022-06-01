import { createPhoneNumberValidationsFactory } from './factories';
import { postPhoneNumberValidations } from '@farfetch/blackout-client/users';

/**
 * Validates a phone number without an account.
 */
export default createPhoneNumberValidationsFactory(postPhoneNumberValidations);
