class UniqueViewIdStorageOptions {
  /**
   * Default storage expiration time in minutes. Value is 1440.
   */
  static MAX_EXPIRES = 1440;

  /**
   * Default maximum items stored on local storage. Value is 2500.
   */
  static MAX_ITEMS = 2500;

  /**
   * Gets an instance with default values applied.
   *
   * @returns {UniqueViewIdStorageOptions} An instance with default values applied.
   */
  static default() {
    return new UniqueViewIdStorageOptions();
  }

  /**
   * Indicates how long until storage expires. Value is in minutes.
   */
  expires;

  /**
   * Indicates how many items should be stored.
   */
  maxItems;

  constructor(
    expires = UniqueViewIdStorageOptions.MAX_EXPIRES,
    maxItems = UniqueViewIdStorageOptions.MAX_ITEMS,
  ) {
    this.expires = expires;
    this.maxItems = maxItems;
  }
}

export default UniqueViewIdStorageOptions;
