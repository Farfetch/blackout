import type { FacetGroupsNormalized } from '../../entities/types';

/**
 * Get the maximum depth in a bundle of facetGroups.
 *
 * @memberof module:products/utils
 *
 * @param {Array} facetsGroups - Facet groups to map.
 *
 * @returns {number} The maximum depth.
 */
const getMaxDepth = (facetsGroups: FacetGroupsNormalized): number =>
  Math.max(...facetsGroups.map(({ deep }) => deep));

export default getMaxDepth;
