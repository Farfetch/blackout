/**
 * Get the shallowest depth in a bundle of facetGroups.
 *
 * @function getShallowestDepth
 * @memberof module:product/listing/utils
 *
 * @param {Array} facetsGroups - Facet groups to map.
 *
 * @returns {number} The shallowest depth.
 */
export default facetsGroups =>
  Math.min(...facetsGroups.map(({ deep }) => deep));
