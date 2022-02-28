import { CONSENT_KEYS } from './utils';
import merge from 'lodash/merge';
import pick from 'lodash/pick';
import type ConsentData from './types/consentData.types';
import type StorageWrapper from './utils/StorageWrapper';

const defaultConsentData: ConsentData = {
  marketing: false,
  preferences: false,
  statistics: false,
};

/**
 * Stores the consent values in a new instance.
 *
 * @private
 * @category Analytics
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
   * Returns the stored consent object. If not defined, returns the defaults.
   *
   * @returns Promise that will resolve with the consent data.
   */
  async get(): Promise<ConsentData> {
    const getItem = (await this.storage.getItem('consent')) as Record<
      string,
      boolean | undefined
    >;

    return {
      marketing: getItem?.marketing || defaultConsentData.marketing,
      preferences: getItem?.preferences || defaultConsentData.preferences,
      statistics: getItem?.statistics || defaultConsentData.statistics,
    };
  }

  /**
   * Merges consent default properties with incoming ones from data received.
   *
   * @param data - Object with properties for the different types of preferences (Marketing, preferences or statistics).
   * @param data.marketing
   * @param data.preferences
   * @param data.statistics
   * @returns Promise that will resolve with the instance that was used when calling this method to allow chaining.
   */
  async set(
    data: {
      marketing?: boolean;
      preferences?: boolean;
      statistics?: boolean;
    } = defaultConsentData,
  ): Promise<Consent> {
    const consent = pick(data, CONSENT_KEYS);
    const currentConsentFromStorage = ((await this.storage.getItem(
      'consent',
    )) || {}) as typeof data;

    const newConsent = merge(currentConsentFromStorage, {
      marketing: consent.marketing || !!currentConsentFromStorage?.marketing,
      preferences:
        consent.preferences || !!currentConsentFromStorage?.preferences,
      statistics: consent.statistics || !!currentConsentFromStorage?.statistics,
    });

    await this.storage.setItem('consent', newConsent);

    return this;
  }
}

export default Consent;
