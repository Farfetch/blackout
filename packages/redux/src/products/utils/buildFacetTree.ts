import { isEmpty } from 'lodash-es';
import type { FacetEntity } from '../../entities/types/index.js';

/**
 * Build all the children below a certain facetId, by facetId received. This is a
 * recursive function to be able to find children at all facet levels.
 *
 * @param facets  - All facets existent.
 * @param facetId - Facet id to discover all the children.
 *
 * @returns Array with objects that representing all the children encountered.
 */
const buildFacetTree = (
  facets: FacetEntity[] | undefined,
  facetId: FacetEntity['id'],
): Array<FacetEntity> | undefined => {
  // Find all the children of a particular facetId
  const facetChildren = facets?.filter(({ parentId }) => parentId === facetId);

  // Does the facet have children?
  if (isEmpty(facetChildren)) {
    return;
  }

  // Find all the children in all levels.
  return Object.values(facetChildren as FacetEntity[]).map(facet => ({
    ...facet,
    children: buildFacetTree(facets, facet.id),
  }));
};

export default buildFacetTree;
