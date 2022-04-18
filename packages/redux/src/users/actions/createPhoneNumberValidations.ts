import { createPhoneNumberValidationsFactory } from './factories';
import { postPhoneNumberValidations } from '@farfetch/blackout-client/users';

/**
 * Validates a phone number without an account.
 *
 * @memberof module:users/actions
 *
 * @function createPhoneNumberValidations
 *
 * @type {CreatePhoneNumberValidationsThunkFactory}
 */
export default createPhoneNumberValidationsFactory(postPhoneNumberValidations);
