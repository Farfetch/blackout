import type { FacetGroupsNormalized } from '../../entities/types/index.js';

/**
 * Get the maximum depth in a bundle of facet groups.
 *
 * @param facetGroups - Facet groups to get the maximum depth from.
 *
 * @returns The maximum depth of the passed facet groups.
 */
const getFacetGroupsMaxDepth = (facetGroups: FacetGroupsNormalized): number =>
  Math.max(...facetGroups.map(({ deep }) => deep));

export default getFacetGroupsMaxDepth;
