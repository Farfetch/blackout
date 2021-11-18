import { schema } from 'normalizr';
import content from './content';

export default new schema.Entity(
  'contentGroups',
  {
    entries: [content],
  },
  {
    idAttribute: ({ hash }) => hash,
  },
);
