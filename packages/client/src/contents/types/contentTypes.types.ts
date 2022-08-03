import type { Config, PagedResponse } from '../../types';

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

export type PublicationTargetType = {
  name: string;
  restrictedValues: string[];
  customMetadataSchema?: CustomMetadataSchema;
};

export type ContentType = {
  code: string;
  publicationTargetTypes: PublicationTargetType[];
};

export type ContentTypes = PagedResponse<ContentType>;

export type GetContentTypes = (
  spaceCode: string,
  config?: Config,
) => Promise<ContentTypes>;
