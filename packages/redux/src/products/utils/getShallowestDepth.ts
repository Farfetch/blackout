import type { FacetGroupsNormalized } from '../../entities/types';

/**
 * Get the shallowest depth in a bundle of facetGroups.
 *
 * @memberof module:products/utils
 *
 * @param {Array} facetsGroups - Facet groups to map.
 *
 * @returns {number} The shallowest depth.
 */
const getShallowestDepth = (facetsGroups: FacetGroupsNormalized): number =>
  Math.min(...facetsGroups.map(({ deep }) => deep));

export default getShallowestDepth;
