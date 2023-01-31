import Entity from './Entity';
import uuid from 'uuid';

/**
 * Handles and persists user data on the instance.
 * Persists localId on the passed in storage.
 *
 * @private
 * @category Analytics
 */
class User extends Entity {
  /**
   * Constructs a new user instance with the passed in storage wrapper instance.
   *
   * @param {StorageWrapper} storage - The storage wrapper instance where data will be stored.
   */
  constructor(storage) {
    super();

    // NOTE: For now, we will only check if the storage reference is set to something,
    //      as we are already validating the storage on the analytics class, so it is not
    //      required to do it right now. If we expose this class to be used in other
    //      scenarios, then we will need to revisit this validation code.
    if (!storage) {
      throw new Error('Invalid storage instance provided to User constructor');
    }

    this.storage = storage;

    this.set();
  }

  /**
   * Creates a new guid if there's none already created and stored.
   * This ID will be persisted as long as the TTL(time-to-live) set in the storage (Max. Up to one year, due to GDPR regulations).
   *
   * @returns {Promise<string>} Promise that will resolve with the user local ID (GUID).
   */
  async localId() {
    let localId = await this.storage.getItem('localId');

    if (!localId) {
      localId = uuid.v4();
      await this.storage.setItem('localId', localId);
    }

    return localId;
  }

  /**
   * Returns the user data.
   * Fetches localId from storage and merges with super.get() object.
   *
   * @returns {Promise<object>} Promise that will resolve with the user's data.
   */
  async get() {
    const localId = await this.localId();

    return {
      ...super.get(),
      localId,
    };
  }

  /**
   * Allows to pass user ID and its properties (traits) to be merged with existing ones on the store.
   *
   * @param {string} id - Id of the user.
   * @param {object} traits - Properties like name, email, etc of the user.
   *
   * @returns {Promise<User>} Promise that will resolve with the instance that was used when calling this method to allow chaining.
   */
  async set(id = null, traits = {}) {
    // Generate a new localId and store it (if needed)
    await this.localId();

    super.set({
      id,
      traits,
    });

    return this;
  }

  /**
   * Deletes user data.
   *
   * @returns {object} User instance to allow chaining of methods.
   */
  anonymize() {
    // Reset the user with defaults
    super.set({ id: null, traits: {} }, true);

    return this;
  }
}

export default User;
