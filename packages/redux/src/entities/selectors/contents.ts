import { getEntityById } from './entity';
import type { ContentEntries } from '@farfetch/blackout-client/contents/types';
import type { StoreState } from '../../types';

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
export const getContent = (state: StoreState, id: string): ContentEntries =>
  getEntityById(state, 'contents', id);
