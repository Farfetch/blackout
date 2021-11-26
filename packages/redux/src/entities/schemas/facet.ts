import { schema } from 'normalizr';

const getId = (
  { value, valueUpperBound, groupsOn }: any,
  { description, type: parentType }: any,
) =>
  `${description.toLowerCase()}_${value}${
    // Special scenario when the facet type is "size by category"
    parentType === 24 ? `_${groupsOn}` : ''
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
      parentId: `${parent.description.toLowerCase()}_${entity.parentId}`,
    }),
  },
);
