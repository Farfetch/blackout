import { adaptDate } from '../../helpers/adapters';
import { schema } from 'normalizr';

export const content = new schema.Entity(
  'contents',
  {},
  {
    idAttribute: ({ publicationId }) => publicationId,
    processStrategy: value => {
      const processedValue = {
        ...value,
        publicationDate: adaptDate(value.publicationDate),
      };

      if (processedValue.metadata?.custom) {
        processedValue.metadata = {
          ...processedValue.metadata,
          custom: {
            ...processedValue.metadata.custom,
            eventDate: adaptDate(processedValue.metadata.custom.eventDate),
          },
        };
      }

      return processedValue;
    },
  },
);

export const contentEntries = {
  entries: [content],
};
