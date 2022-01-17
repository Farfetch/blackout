import { schema } from 'normalizr';

export const content = new schema.Entity(
  'contents',
  {},
  {
    idAttribute: ({ publicationId }) => publicationId,
  },
);

export const contentEntries = {
  entries: [content],
};
