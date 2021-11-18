import { schema } from 'normalizr';

export default new schema.Entity(
  'designerResults',
  {},
  {
    idAttribute: ({ hash }) => hash,
  },
);
