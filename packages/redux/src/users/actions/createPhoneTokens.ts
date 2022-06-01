import { createPhoneTokensFactory } from './factories';
import { postPhoneTokens } from '@farfetch/blackout-client/users';

/**
 * Sends a phone token to the specified phone number.
 */
export default createPhoneTokensFactory(postPhoneTokens);
