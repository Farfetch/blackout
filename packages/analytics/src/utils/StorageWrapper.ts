import { PACKAGE_NAME } from './constants';
import get from 'lodash/get';
import merge from 'lodash/merge';
import validateStorage from './validateStorage';
import type { Storage } from './types';

const oldStorageKey = '@farfetch/blackout-core/analytics';

/**
 * Manages a storage with a specific key and a time-to-live.
 *
 * @private
 * @category Analytics
 */
class StorageWrapper {
  storage: Storage;

  /**
   * Constructs a new instance with the passed in storage instance and initializes the store.
   * This storage instance must implement the methods async getItem(key), async setItem(key, data) and async removeItem(key) methods.
   * For now it validates only if the storage is defined and if not, an error will be thrown.
   * In the future, the validation logic will be changed to ensure the required methods are implemented on the passed in instance.
   *
   * @param storage - The underlying storage instance that will store the data.
   *
   * //TODO: Change validateStorage function to validate if the storage instance contains the required methods.
   */
  constructor(storage?: Storage) {
    if (!validateStorage(storage)) {
      throw new Error(
        'StorageWrapper needs a valid storage to properly persist data. Please make sure you are passing a valid storage.',
      );
    }
    this.storage = storage as Storage;
    this.createStorage(storage as Storage);
  }

  /**
   * As our package naming changes, we should ensure retro-compatibility regarding the previous storage entry name,
   * so for that we have this method that fetches the data from the storage with the previous package name (`oldStorageKey`, if available)
   * and sets its value with the new one.
   *
   * @private
   *
   * @returns Promise that will resolve with the instance that was used when calling this method to allow chaining.
   */
  async preProcessStorage(): Promise<this> {
    const oldStorage = await this.storage.getItem(oldStorageKey);

    if (oldStorage) {
      await this.storage.setItem(PACKAGE_NAME, oldStorage);

      await this.storage.removeItem(oldStorageKey);
    }

    return this;
  }

  /**
   * Creates the store with the time-to-live.
   * Checks if there's a previous TTL stored, and if it's expired, stores a new one.
   *
   * @private
   * @param storage - The actual storage that will hold the data, like the browser localStorage.
   *
   * @returns Promise that will resolve when the method finishes.
   */
  async createStorage(storage: Storage): Promise<void> {
    this.storage = storage;

    await this.preProcessStorage();

    const store = await this.getItem();
    const ttlInMs = get(store, 'ttl', 0);
    const now = new Date();
    const nowInMs = now.getTime();

    // If store has expired, clear it and renew it with one year time-to-live, so it's GDPR complient.
    if (ttlInMs < nowInMs) {
      await this.clear();
      await this.setItem('ttl', now.setFullYear(now.getFullYear() + 1));
    }
  }

  /**
   * Returns a value from the storage, or the storage itself if no key is passed.
   *
   * @param key - The key of the storage to return. If not passed, all items will be returned.
   *
   * @returns Promise that will resolve the value for the specified key.
   */
  async getItem(
    key?: string,
  ): Promise<Record<string, unknown> | unknown | undefined> {
    const storeRawValue = await this.storage.getItem(PACKAGE_NAME);
    const store = JSON.parse(storeRawValue || '{}');

    if (!key) {
      return store;
    }

    return get(store, key);
  }

  /**
   * Sets a value with a key on the storage.
   *
   * @param key - The key to store.
   * @param data - The data to store with the passed key.
   *
   * @returns Promise that will resolve with the instance that was used when calling this method to allow chaining.
   */
  async setItem(key?: string, data?: unknown): Promise<this> {
    if (!key) {
      return this;
    }

    let store = await this.getItem();

    store = merge({}, store, { [key]: data });
    await this.storage.setItem(PACKAGE_NAME, JSON.stringify(store));

    return this;
  }

  /**
   * Removes a value with the specified key from the store.
   *
   * @param key - The key to the item that will be removed.
   *
   * @returns Promise that will resolve with the instance that was used when calling this method to allow chaining.
   */
  async removeItem(key: string): Promise<this> {
    const store = await this.getItem();

    if (store && store instanceof Object)
      delete (store as Record<string, unknown>)[key];

    await this.storage.setItem(PACKAGE_NAME, JSON.stringify(store));

    return this;
  }

  /**
   * Removes the whole entry form the storage.
   *
   * @returns Promise that will resolve with the instance that was used when calling this method to allow chaining.
   */
  async clear(): Promise<this> {
    await this.storage.removeItem(PACKAGE_NAME);

    return this;
  }
}

export default StorageWrapper;
