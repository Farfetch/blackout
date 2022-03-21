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
function hashPlainTextString(plainString?: string): string | undefined {
  return plainString ? sha256(plainString).toString() : plainString;
}

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
      ...(userData as UserData),
      traits: {
        ...traits,
        dateOfBirth: hashPlainTextString(traits.dateOfBirth),
        email: hashPlainTextString(traits.email),
        firstName: hashPlainTextString(traits.firstName),
        lastName: hashPlainTextString(traits.lastName),
        name: hashPlainTextString(traits.name),
        phoneNumber: hashPlainTextString(traits.phoneNumber),
        username: hashPlainTextString(traits.username),
      },
    };
  }

  // cases where we might receive null/any other value, keep returning the same value to ensure compatibility
  return userData;
};

export default hashUserData;
