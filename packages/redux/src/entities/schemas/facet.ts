import {
  type FacetGroup,
  FacetType,
  type FacetValue,
} from '@farfetch/blackout-client';
import { schema } from 'normalizr';

export const getId = (
  { value, valueUpperBound, groupsOn }: FacetValue,
  { key, type: parentType }: FacetGroup,
) =>
  `${key}_${value}${
    // Special scenario when the facet type is "sizes" or "size by category"
    parentType === FacetType.Sizes || parentType === FacetType.SizesByCategory
      ? `_${groupsOn}`
      : ''
  }${valueUpperBound > 0 ? `_${valueUpperBound}` : ''}`;

export default new schema.Entity(
  'facets',
  {},
  {
    idAttribute: (entity, parent) => getId(entity, parent),
    processStrategy: (entity, parent) => ({
      ...entity,
      id: getId(entity, parent),
      // Since the id is in the format "facetKey_9999999", it's only natural that the parent id is in the same format
      // (it represents an id)
      parentId: `${parent.key}_${entity.parentId}`,
    }),
  },
);
