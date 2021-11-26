import { createSelector } from 'reselect';
import { getEntities, getEntityById } from './entity';
import type { FacetEntity } from '../types';
import type { StoreState } from '../../types';

/**
 * Returns a specific facet by its id.
 *
 * @memberof module:entities/selectors
 *
 * @param {object} state - Application state.
 * @param {number} facetId - Facet id.
 *
 * @returns {object} Facet normalized.
 */
export const getFacet = (
  state: StoreState,
  facetId: FacetEntity['id'],
): FacetEntity | undefined => getEntityById(state, 'facets', facetId);

/**
 * Returns all facets from state.
 *
 * @memberof module:entities/selectors
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Object with key values pairs
 * representing facetId and facet properties.
 */
export const getFacets = (
  state: StoreState,
): Record<FacetEntity['id'], FacetEntity> | undefined =>
  getEntities(state, 'facets');

/**
 * Returns required facets by ids received by parameter.
 *
 * @memberof module:entities/selectors
 *
 * @param {object} state - Application state.
 * @param {Array} facetIds - Facets ids.
 *
 * @returns {Array} Array with all facets content requested.
 */
export const getFacetsByIds = createSelector(
  [
    (state: StoreState) => state,
    (state: StoreState, facetIds: Array<FacetEntity['id']>) => facetIds,
  ],
  (state, facetIds: Array<FacetEntity['id']>) =>
    facetIds.map(id => getFacet(state, id)),
) as (
  state: StoreState,
  facetIds: Array<FacetEntity['id']>,
) => FacetEntity[] | undefined;
