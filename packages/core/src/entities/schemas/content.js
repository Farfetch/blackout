import { schema } from 'normalizr';

export default new schema.Entity(
  'contents',
  {},
  {
    idAttribute: 'publicationId',
    processStrategy: entity => ({
      ...entity,
      id: entity.value,
    }),
  },
);
