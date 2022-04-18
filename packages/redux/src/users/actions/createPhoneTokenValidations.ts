import { createPhoneTokenValidationsFactory } from './factories';
import { postPhoneTokenValidations } from '@farfetch/blackout-client/users';

/**
 * Validate the user's phone number with a phone token.
 *
 * @memberof module:users/actions
 *
 * @function createPhoneTokenValidations
 *
 * @type {CreatePhoneTokenValidationsThunkFactory}
 */
export default createPhoneTokenValidationsFactory(postPhoneTokenValidations);
