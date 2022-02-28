import merge from 'lodash/merge';
/**
 * This class is an abstract entity for both Context, User and Page classes - They have the same data structure.
 *
 * @private
 * @category Analytics
 */
class Entity {
  data: Record<string, unknown>;

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
  get(key?: string): unknown {
    return key ? this.data[key] : this.data;
  }

  /**
   * Stores data received.
   * Merge into a new empty object to break any existing memory reference.
   *
   * @param {Array} data - New data to be merged and stored.
   * @param {boolean} force - Force a new data structure.
   *
   * @returns {Entity} The instance that was used when calling this method to allow chaining.
   */
  set(data: unknown, force = false): Entity {
    force && (this.data = {});

    merge(this.data, data);

    return this;
  }
}

export default Entity;
