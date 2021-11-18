import { CONSENT_KEYS } from './utils';
import merge from 'lodash/merge';
import pick from 'lodash/pick';

/**
 * Stores the consent values in a new instance.
 *
 * @private
 * @category Analytics
 */
class Consent {
  /**
   * Constructs a new consent instance with the passed in storage wrapper instance.
   *
   * @param {StorageWrapper} storage - The storage wrapper instance where data will be stored.
   */
  constructor(storage) {
    // NOTE: For now, we will only check if the storage reference is set to something,
    //      as we are already validating the storage on the analytics class, so it is not
    //      required to do it right now. If we expose this class to be used in other
    //      scenarios, then we will need to revisit this validation code.
    if (!storage) {
      throw new Error(
        'Invalid storage instance provided to Consent constructor',
      );
    }

    this.storage = storage;
  }

  /**
   * Returns the stored consent object. If not defined, returns the defaults.
   *
   * @returns {Promise<object>} Promise that will resolve with the consent data.
   */
  async get() {
    const result = (await this.storage.getItem('consent')) || null;

    return result;
  }

  /**
   * Merges consent default properties with incoming ones from data received.
   *
   * @param {object} [data] - Object with properties for the different types of preferences (Marketing, preferences or statistics).
   *
   * @returns {Promise<Consent>} Promise that will resolve with the instance that was used when calling this method to allow chaining.
   */
  async set(data = {}) {
    const consent = pick(data, CONSENT_KEYS);

    const currentConsentFromStorage =
      (await this.storage.getItem('consent')) || {};

    const newConsent = merge(currentConsentFromStorage, consent);

    await this.storage.setItem('consent', newConsent);

    return this;
  }
}

export default Consent;
