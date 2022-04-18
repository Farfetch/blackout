import { createPhoneTokensFactory } from './factories';
import { postPhoneTokens } from '@farfetch/blackout-client/users';

/**
 * Sends a phone token to the specified phone number.
 *
 * @memberof module:users/actions
 *
 * @function createPhoneTokens
 *
 * @type {CreatePhoneTokenThunkFactory}
 */
export default createPhoneTokensFactory(postPhoneTokens);
