import isEmpty from 'lodash/isEmpty';

/**
 * Build all the children below a certain facetId, by facetId received.
 * This is a recursive function to be able to find children at all facet levels.
 *
 * @function
 * @memberof module:products/listing/utils
 *
 * @param {Array} facets - All facets existent.
 * @param {number} facetId - Facet id to discover all the children.
 *
 * @returns {Array|undefined} Array with objects that representing all the
 * children encountered.
 */
const buildFacetChildren = (facets, facetId) => {
  // Find all the children of a particular facetId
  const facetChildren = facets.filter(({ parentId }) => parentId === facetId);

  // Does the facet have children?
  if (isEmpty(facetChildren)) {
    return;
  }

  // Find all the children in all levels.
  return Object.values(facetChildren).map(facet => ({
    ...facet,
    children: buildFacetChildren(facets, facet.id),
  }));
};

export default buildFacetChildren;
