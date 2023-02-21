import { getTimeInMinutes } from '../../../../helpers';
import { utils } from '@farfetch/blackout-analytics';
import type UniqueViewIdStorageOptions from './UniqueViewIdStorageOptions';

const CACHE_PREFIX = 'UniqueViewId_';

/**
 * A localStorage wrapper which contains logic to manage Omnitracking's unique view
 * ids lifetime.
 */
class UniqueViewIdStorage {
  /**
   * Creates an instance of the storage with the passed configuration.
   *
   * @param config - Config parameters.
   */
  constructor(private config: UniqueViewIdStorageOptions) {}

  /**
   * Gets the unique view id associated with the url received on the key argument
   * from localStorage or null if not found/expired/does not support localStorage.
   *
   * @param key - The url string to retrieve the unique view id from.
   *
   * @returns - The associated unique view id for the key or null if not found/expired/does not support
   * localStorage.
   */
  get(key: string): string | null {
    if (!this.supportsLocalStorage()) {
      return null;
    }

    if (this.isExpired(key)) {
      this.removeItem(key);

      return null;
    }

    const obj = JSON.parse(localStorage.getItem(CACHE_PREFIX + key) as string);

    if (obj) {
      return obj.id;
    }

    return null;
  }

  /**
   * Sets the unique view id value of the url key in localStorage, if supported. Will
   * remove oldest entries if items limit has been reached in order to accommodate
   * the new entry.
   *
   * @param key   - The url to save the unique view id value.
   * @param value - The unique view id to save.
   *
   * @returns True if item was saved in localStorage, false otherwise.
   */
  set(key: string, value: string) {
    if (!this.supportsLocalStorage()) {
      return false;
    }

    if (this.hasLimitReached()) {
      this.removeOldestItem();
    }

    this.setItem(key, value);

    return true;
  }

  /**
   * Removes expired entries in localStorage.
   */
  removeExpired() {
    if (!this.supportsLocalStorage()) {
      return;
    }

    // Loop in reverse as removing items will change indices of tail
    for (let i = localStorage.length - 1; i >= 0; --i) {
      const keyWithPrefix = localStorage.key(i) as string;

      if (keyWithPrefix.indexOf(CACHE_PREFIX) === 0) {
        const key = keyWithPrefix.replace(CACHE_PREFIX, '');

        if (this.isExpired(key)) {
          this.removeItem(key);
        }
      }
    }
  }

  /**
   * Removes oldest item from localStorage, if found.
   */
  removeOldestItem() {
    let oldestKey;
    let oldestTimestamp = getTimeInMinutes() + this.config.expires + 1;

    for (let i = 0; i < localStorage.length; i++) {
      const keyWithPrefix = localStorage.key(i) as string;

      if (keyWithPrefix.indexOf(CACHE_PREFIX) === 0) {
        const obj = JSON.parse(localStorage.getItem(keyWithPrefix) as string);

        if (obj && obj.expires < oldestTimestamp) {
          oldestKey = keyWithPrefix.replace(CACHE_PREFIX, '');
          oldestTimestamp = obj.expires;
        }
      }
    }

    if (oldestKey !== undefined) {
      this.removeItem(oldestKey);
    }
  }

  /**
   * Checks if the currently unique view id items stored in localStorage have hit the
   * limit specified in config.
   *
   * @returns True if the max limit of items stored in localStorage is greater or equal than the maxItems
   * config.
   */
  hasLimitReached() {
    let count = 0;

    for (let i = localStorage.length - 1; i >= 0; --i) {
      const key = localStorage.key(i) as string;

      if (key.indexOf(CACHE_PREFIX) === 0) {
        count++;
      }
    }

    return count >= this.config.maxItems;
  }

  /**
   * Check if a url key entry in localStorage has expired.
   *
   * @param key - The url key to check.
   *
   * @returns True if the expires time of the entry has been reached, false otherwise.
   */
  isExpired(key: string) {
    const obj = JSON.parse(localStorage.getItem(CACHE_PREFIX + key) as string);

    if (obj) {
      // Check if we should actually kick item out of storage
      if (getTimeInMinutes() >= obj.expires) {
        return true;
      }
    }

    return false;
  }

  /**
   * Auxiliary method used by set method to store the entry in localStorage.
   *
   * @param key   - The url key to save the unique view id value.
   * @param value - The unique view id value for the url key.
   */
  setItem(key: string, value: string) {
    try {
      const obj = {
        id: value,
        expires: getTimeInMinutes() + this.config.expires,
      };

      const itemKey = CACHE_PREFIX + key;

      localStorage.removeItem(itemKey);
      localStorage.setItem(itemKey, JSON.stringify(obj));
    } catch (e) {
      // Discard the error here, even if it is a QuotaExceededError to avoid
      // crashing the application.
      utils.logger.warn(
        `Unable to store unique view id '${value}' for key: '${key}': ${e}.`,
      );
    }
  }

  /**
   * Removes an item from localStorage.
   *
   * @param key - The url key to remove.
   */
  removeItem(key: string) {
    localStorage.removeItem(CACHE_PREFIX + key);
  }

  /**
   * Checks if the runtime environment supports localStorage.
   *
   * @returns True if localStorage is supported, false otherwise.
   */
  supportsLocalStorage() {
    try {
      const x = '__storage_test__';

      localStorage.setItem(x, x);
      localStorage.removeItem(x);

      return true;
    } catch (e) {
      // In private browsing mode, Safari and iOS Safari up to including version 10.x
      // as well as the Android browser (not include Chrome for Android)
      // do not support setting sessionStorage or localStorage.

      return (
        e instanceof DOMException &&
        // everything except Firefox
        (e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === 'QuotaExceededError' ||
          // Firefox
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
        // acknowledge QuotaExceededError only if there's something already stored
        localStorage &&
        localStorage.length !== 0
      );
    }
  }

  /**
   * Clears all UniqueViewId items from localStorage.
   */
  clear() {
    // Loop in reverse as removing items will change indices of tail
    for (let i = localStorage.length - 1; i >= 0; --i) {
      const keyWithPrefix = localStorage.key(i) as string;

      if (keyWithPrefix.indexOf(CACHE_PREFIX) === 0) {
        const key = keyWithPrefix.replace(CACHE_PREFIX, '');

        this.removeItem(key);
      }
    }
  }
}

export default UniqueViewIdStorage;
