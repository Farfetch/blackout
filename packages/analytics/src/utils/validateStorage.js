/**
 * Validates if the passed in storage to be used in analytics is valid.
 * For now, we will just check if the passed in value is set.
 * In the future, we will implement a more robust check for
 * all the required methods that the object must implement.
 *
 * @param {object} storage - The storage instance to validate.
 *
 * @returns {boolean} If the storage is valid or not.
 */
export default function validateStorage(storage) {
  if (!storage) {
    return false;
  }

  return true;
}
