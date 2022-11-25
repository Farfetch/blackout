import type {
  ComponentType,
  ContentEntry,
  Metadata,
} from '@farfetch/blackout-client';

export type CustomMetadataNormalized = Omit<
  NonNullable<Metadata['custom']>,
  'eventDate'
> & {
  eventDate: number | null;
};

export type ContentsEntity<T = ComponentType[]> = Omit<
  ContentEntry<T>,
  'publicationDate' | 'metadata'
> & {
  publicationDate: number | null;
  metadata?: Omit<Metadata, 'custom'> & {
    custom?: CustomMetadataNormalized;
  };
};
