import isEmpty from 'lodash/isEmpty';
import sha256 from 'crypto-js/sha256';

/**
 * Hashes a string with SHA-256 encryption.
 *
 * @param {string} plainString - String to create the hash from.
 *
 * @returns {string} - The hashed result.
 */
const hashPlainTextString = plainString =>
  plainString ? sha256(plainString).toString() : plainString;

/**
 * Hashes some user properties that we receive from the /users/me request through analytics.setUser().
 * This might be necessary in cases where we pass user PII data to third-parties.
 *
 * @param {object} userData - The analytics user data object.
 *
 * @returns {object} - The same object with some hashed properties.
 */
export default userData => {
  if (!isEmpty(userData)) {
    const traits = userData?.traits || {};

    return {
      ...userData,
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
