/**
 * Get the maximum depth in a bundle of facetGroups.
 *
 * @function getMaxDepth
 * @memberof module:product/listing/utils
 *
 * @param {Array} facetsGroups - Facet groups to map.
 *
 * @returns {number} The maximum depth.
 */
export default facetsGroups =>
  Math.max(...facetsGroups.map(({ deep }) => deep));
