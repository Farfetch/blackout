export interface Storage {
  items: Record<string, string>;

  /** @returns Returns the current value associated with the given key, or null if the given key does not exist. */
  getItem(key: string): Promise<string | null>;

  /**
   * Removes the key/value pair with the given key, if a key/value pair with the given key exists.
   *
   * @returns Dispatches a storage event on Window objects holding an equivalent Storage object.
   */
  removeItem(key: string): Promise<void>;

  /**
   * Sets the value of the pair identified by key to value, creating a new key/value pair if none existed for key previously.
   *
   * Throws a "QuotaExceededError" DOMException exception if the new value couldn't be set. (Setting could fail if, e.g., the user has disabled storage for the site, or if the quota has been exceeded.).
   *
   * @returns Dispatches a storage event on Window objects holding an equivalent Storage object.
   */
  setItem(key: string, value: string): Promise<void>;

  /**
   * Removes the whole entry form the storage.
   *
   * @returns Promise that will resolve with the instance that was used when calling this method to allow chaining.
   */
  clear(): Promise<void>;
}
