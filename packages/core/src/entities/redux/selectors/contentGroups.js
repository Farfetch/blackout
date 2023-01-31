import { getEntity } from './entity';

/**
 * Returns a specific content group by its hash.
 *
 * @function getContentGroup
 * @memberof module:entities/selectors
 *
 * @param {object} state - Application state.
 * @param {string} hash - Content group hash.
 *
 * @returns {object} ContentGroup normalized.
 */
export const getContentGroup = (state, hash) =>
  getEntity(state, 'contentGroups', hash);
