import { merge } from 'lodash-es';

type Data = Record<string, unknown>;

/**
 * This is a simple helper class to hold data in memory and encapsulates get/set
 * data logic.
 */
class DataStore {
  data: Data;

  constructor(data = {}) {
    this.data = data;
  }

  /**
   * Retrieves stored data.
   *
   * @param key - Property of object data.
   *
   * @returns Retrieves stored data.
   */
  get(): Data;
  get(key: string): unknown;
  get(key?: string) {
    return key ? this.data[key] : this.data;
  }

  /**
   * Stores data received. Merge into a new empty object to break any existing memory
   * reference.
   *
   * @param data  - New data to be merged and stored.
   * @param force - Force a new data structure.
   *
   * @returns The instance that was used when calling this method to allow chaining.
   */
  set(data: Data, force = false): DataStore {
    force && (this.data = {});

    merge(this.data, data);

    return this;
  }
}

export default DataStore;
