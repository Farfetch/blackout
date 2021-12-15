import type { Config, IndexSignature } from '../../types';

export type Targets = IndexSignature<string | undefined> & {
  contentzone?: string;
  language?: string;
  country?: string;
  benefits?: string;
};

export type QueryContents = IndexSignature<
  string | string[] | number | undefined
> & {
  spaceCode: string;
  environmentCode: string;
  contentTypeCode: string;
  codes?: string | string[];
  target?: Targets;
  sort?: string;
  page?: number;
  pageSize?: number;
  metadataSearchTagsValues?: string;
  metadataCustom?: string;
};

export interface ComponentType {
  type: string;
  // Need to use any here because fields could have a big nested structure.
  fields: Record<string, any>;
  customType: string;
  name: string;
  displayOptions: Record<string, string>;
}

export interface ContentEntries {
  publicationId: string;
  publicationDate: Date;
  versionId: string;
  spaceCode: string;
  metadata?: Record<string, string>;
  target?: Targets;
  contentTypeCode: string;
  environmentCode: string;
  code: string;
  components: Array<ComponentType>;
}

export interface Contents {
  number: number;
  totalPages: number;
  totalItems: number;
  entries: Array<ContentEntries>;
}

export type GetContent = (
  query: QueryContents,
  config?: Config,
) => Promise<Contents>;
