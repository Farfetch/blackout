import { getEntity } from './entity';

/**
 * Returns a specific content by its id.
 *
 * @function getContent
 * @memberof module:entities/selectors
 *
 * @param {object} state - Application state.
 * @param {string} id - Content id (originally publicationId).
 *
 * @returns {object} Content normalized.
 */
export const getContent = (state, id) => getEntity(state, 'contents', id);
