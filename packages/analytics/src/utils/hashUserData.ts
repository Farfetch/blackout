import isEmpty from 'lodash/isEmpty';
import sha256 from 'crypto-js/sha256';
import type { UserData, UserTraits } from '../types/analytics.types';

/**
 * Hashes a string with SHA-256 encryption.
 *
 * @param plainString - String to create the hash from.
 *
 * @returns The hashed result.
 */
const hashPlainTextString = (
  plainString: string | undefined | null,
): string | undefined | null =>
  plainString ? sha256(plainString).toString() : plainString;

/**
 * Hashes some user properties that we receive from the /users/me request through analytics.setUser().
 * This might be necessary in cases where we pass user PII data to third-parties.
 *
 * @param userData - The analytics user data object.
 *
 * @returns - The same object with some hashed properties.
 */
const hashUserData = (userData: UserData): UserData => {
  if (!isEmpty(userData)) {
    const traits: UserTraits = userData?.traits || {};

    return {
      ...userData,
      traits: {
        ...traits,
        dateOfBirth: hashPlainTextString(traits.dateOfBirth as string),
        email: hashPlainTextString(traits.email as string),
        firstName: hashPlainTextString(traits.firstName as string),
        lastName: hashPlainTextString(traits.lastName as string),
        name: hashPlainTextString(traits.name as string),
        phoneNumber: hashPlainTextString(traits.phoneNumber as string),
        username: hashPlainTextString(traits.username as string),
      },
    };
  }

  // cases where we might receive null/any other value, keep returning the same value to ensure compatibility
  return userData;
};

export default hashUserData;
