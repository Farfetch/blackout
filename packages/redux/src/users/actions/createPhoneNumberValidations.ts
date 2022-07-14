import { createPhoneNumberValidationsFactory } from './factories';
import { postPhoneNumberValidations } from '@farfetch/blackout-client';

/**
 * Validates a phone number without an account.
 */
export const createPhoneNumberValidations = createPhoneNumberValidationsFactory(
  postPhoneNumberValidations,
);
