import { getEntityById } from './entity';
import type { ContentEntry } from '@farfetch/blackout-client';
import type { StoreState } from '../../types';

/**
 * Returns a specific content by its id.
 *
 * @param state - Application state.
 * @param id    - Content id (originally publicationId).
 *
 * @returns Content normalized.
 */
export const getContent = (
  state: StoreState,
  id: string,
): ContentEntry | undefined => getEntityById(state, 'contents', id);
