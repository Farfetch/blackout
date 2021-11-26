import type { Config } from '../../types';

export type CustomMetadataSchemaProperty = {
  title: string;
  type: string;
  description: string;
};

export type CustomMetadataSchema = {
  title: string;
  type: string;
  description: string;
  properties?: Record<string, CustomMetadataSchemaProperty>;
};

export type PublicationTargetTypes = {
  name: string;
  restrictedValues: string[];
  customMetadataSchema?: CustomMetadataSchema;
};

export type ContentTypesEntries = {
  code: string;
  publicationTargetTypes: Array<PublicationTargetTypes>;
};

export type ContentTypes = {
  number: number;
  totalPages: number;
  totalItems: number;
  entries: Array<ContentTypesEntries>;
};

export type GetContentTypes = (
  spaceCode: string,
  config?: Config,
) => Promise<ContentTypes>;
