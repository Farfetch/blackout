import type { FacetGroupsNormalized } from '../../entities/types/index.js';

/**
 * Get the shallowest depth in a bundle of facetGroups.
 *
 * @param facetsGroups - Facet groups to map.
 *
 * @returns The shallowest depth.
 */
const getShallowestDepth = (facetsGroups: FacetGroupsNormalized): number =>
  Math.min(...facetsGroups.map(({ deep }) => deep));

export default getShallowestDepth;
