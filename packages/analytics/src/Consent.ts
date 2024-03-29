import { merge } from 'lodash-es';
import type { ConsentData } from './types/analytics.types.js';
import type StorageWrapper from './utils/StorageWrapper.js';

/**
 * Stores the consent values in a new instance.
 */
class Consent {
  storage: StorageWrapper;
  /**
   * Constructs a new consent instance with the passed in storage wrapper instance.
   *
   * @param storage - The storage wrapper instance where data will be stored.
   */
  constructor(storage: StorageWrapper) {
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
   * Returns the stored consent object. If not defined, returns null.
   *
   * @returns Promise that will resolve with the consent data.
   */
  async get(): Promise<ConsentData | null> {
    return ((await this.storage.getItem('consent')) as ConsentData) || null;
  }

  /**
   * Merges consent default properties with incoming ones from data received.
   *
   * @param data - Object with properties for the different types of preferences (Marketing, preferences
   *               or statistics).
   *
   * @returns Promise that will resolve with the instance that was used when calling this method to allow
   * chaining.
   */
  async set(data: ConsentData | undefined): Promise<Consent> {
    const currentConsentFromStorage = ((await this.storage.getItem(
      'consent',
    )) || {}) as typeof data;

    const newConsent = merge(currentConsentFromStorage, data);

    await this.storage.setItem('consent', newConsent);

    return this;
  }
}

export default Consent;
