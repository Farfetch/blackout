import { schema } from 'normalizr';

export const content = new schema.Entity(
  'contents',
  {},
  {
    idAttribute: (entity, { hash }) => hash,
  },
);

export const contentEntries = {
  entries: [content],
};
