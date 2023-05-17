import type { FacetGroupsNormalized } from '../../entities/types/index.js';

/**
 * Get the shallowest depth in a bundle of facet groups.
 *
 * @param facetGroups - Facet groups to get the shallowest depth from.
 *
 * @returns The shallowest depth of the passed facet groups.
 */
const getFacetGroupsShallowestDepth = (
  facetGroups: FacetGroupsNormalized,
): number => Math.min(...facetGroups.map(({ deep }) => deep));

export default getFacetGroupsShallowestDepth;
