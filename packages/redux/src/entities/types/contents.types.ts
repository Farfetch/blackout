import type {
  ComponentType,
  ContentEntry,
  ContentMetadata,
} from '@farfetch/blackout-client';

export type CustomMetadataNormalized = Record<
  string,
  string | number | null
> & {
  eventDate: number | null;
};

export type ContentEntity<T = ComponentType[]> = Omit<
  ContentEntry<T>,
  'publicationDate' | 'metadata'
> & {
  publicationDate: number | null;
  metadata?: Omit<ContentMetadata, 'custom'> & {
    custom?: CustomMetadataNormalized;
  };
};
