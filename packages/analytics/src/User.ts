import DataStore from './DataStore';
import uuid from 'uuid';
import type { StorageWrapper } from './utils';
import type { UserData } from './types/analytics.types';

/**
 * Handles and persists user data on the instance.
 * Persists localId on the passed in storage.
 */
class User {
  storage: StorageWrapper;
  dataStore: DataStore;

  /**
   * Constructs a new user instance with the passed in storage wrapper instance.
   *
   * @param storage - The storage wrapper instance where data will be stored.
   */
  constructor(storage: StorageWrapper) {
    // NOTE: For now, we will only check if the storage reference is set to something,
    //      as we are already validating the storage on the analytics class, so it is not
    //      required to do it right now. If we expose this class to be used in other
    //      scenarios, then we will need to revisit this validation code.
    if (!storage) {
      throw new Error('Invalid storage instance provided to User constructor');
    }

    this.storage = storage;
    this.dataStore = new DataStore();

    this.set();
  }

  /**
   * Creates a new guid if there's none already created and stored.
   * This ID will be persisted as long as the TTL(time-to-live) set in the storage (Max. Up to one year, due to GDPR regulations).
   *
   * @returns Promise that will resolve with the user local ID (GUID).
   */
  async localId(): Promise<string> {
    let localId = (await this.storage.getItem('localId')) as string | undefined;

    if (!localId) {
      localId = uuid.v4();
      await this.storage.setItem('localId', localId);
    }

    return localId as string;
  }

  /**
   * Returns the user data.
   * Fetches localId from storage and merges with super.get() object.
   *
   * @returns Promise that will resolve with the user's data.
   */
  async get(): Promise<UserData> {
    const localId = await this.localId();

    return {
      ...this.dataStore.get(),
      localId,
    } as UserData;
  }

  /**
   * Allows to update user data to be merged with existing ones on the store.
   *
   * @param id - Id of the user.
   * @param traits - Properties like name, email, etc of the user.
   *
   * @returns Promise that will resolve with the instance that was used when calling this method to allow chaining.
   */
  async set(id: string | null = null, traits = {}): Promise<User> {
    // Generate a new localId and store it (if needed)
    await this.localId();

    this.dataStore.set({
      id,
      traits,
    });

    return this;
  }

  /**
   * Deletes user data.
   *
   * @returns Promise that will resolve with the instance that was used when calling this method to allow chaining.
   */
  async anonymize(): Promise<User> {
    // Reset the user with defaults
    this.dataStore.set({ id: null, traits: {} }, true);

    return this;
  }
}

export default User;
