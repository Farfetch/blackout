import { getEntity } from './entity';

/**
 * Returns a specific facet by its id.
 *
 * @function getFacet
 * @memberof module:entities/selectors
 *
 * @param {object} state - Application state.
 * @param {number} facetId - Facet id.
 *
 * @returns {object} Facet normalized.
 */
export const getFacet = (state, facetId) => getEntity(state, 'facets', facetId);

/**
 * Returns all facets from state.
 *
 * @function getFacets
 * @memberof module:entities/selectors
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Object with key values pairs
 * representing facetId and facet properties.
 */
export const getFacets = state => getEntity(state, 'facets');

/**
 * Returns required facets by ids received by parameter.
 *
 * @function getFacetsByIds
 * @memberof module:entities/selectors
 *
 * @param {object} state - Application state.
 * @param {Array} facetIds - Facets ids.
 *
 * @returns {Array} Array with all facets content requested.
 */
export const getFacetsByIds = (state, facetIds) =>
  facetIds.map(id => getFacet(state, id));

/**
 * Returns all facets by parent type.
 *
 * @function getFacetsByGroupType
 * @memberof module:entities/selectors
 * @param {object} state - Application state.
 * @param {number} facetGroupType - Facet group type to find.
 *
 * @returns {Array} Array with all facets content requested by group type.
 */
export const getFacetsByGroupType = (state, facetGroupType) =>
  Object.values(getFacets(state)).filter(
    facet => facet?.groupType === facetGroupType,
  );
