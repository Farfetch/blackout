import { FacetType, type FacetValue } from '@farfetch/blackout-client';
import { schema } from 'normalizr';
import type { FacetGroupWithListingHash } from '../index.js';

export const getId = (
  { value, valueUpperBound, groupsOn }: FacetValue,
  { key, type: parentType, hash }: FacetGroupWithListingHash,
) =>
  `${key}_${value}${
    // Special scenario when the facet type is "sizes" or "size by category"
    parentType === FacetType.Sizes || parentType === FacetType.SizesByCategory
      ? `_${groupsOn}`
      : ''
  }${valueUpperBound > 0 ? `_${valueUpperBound}` : ''}${
    hash ? `_${hash}` : ''
  }`;

export default new schema.Entity(
  'facets',
  {},
  {
    idAttribute: (entity, parent) => getId(entity, parent),
    processStrategy: (entity, parent) => ({
      ...entity,
      id: getId(entity, parent),
      // Since the id is in the format "facetKey_9999999_hash", it's only natural that the parent id is in the same format
      // (it represents an id)
      parentId: `${parent.key}_${entity.parentId}${
        parent.hash ? `_${parent.hash}` : ''
      }`,
      groupType: parent.type,
    }),
  },
);
