import type { FacetGroupsNormalized } from '../../entities/types';

/**
 * Get the maximum depth in a bundle of facetGroups.
 *
 * @param facetsGroups - Facet groups to map.
 *
 * @returns The maximum depth.
 */
const getMaxDepth = (facetsGroups: FacetGroupsNormalized): number =>
  Math.max(...facetsGroups.map(({ deep }) => deep));

export default getMaxDepth;
