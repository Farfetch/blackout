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
  fields?: Record<string, any>;
  content?: string;
  customType?: string;
  name?: string;
  displayOptions?: Record<string, string>;
}

export interface Metadata {
  custom?: {
    id: string;
    gender: string;
    brand: string;
    priceType: string;
    category: string;
  };
}

export interface ContentEntries {
  publicationId: string;
  publicationDate: string;
  versionId: string;
  spaceCode: string;
  metadata: Metadata;
  target?: Targets;
  contentTypeCode: string;
  environmentCode: string;
  code: string;
  ranking?: number;
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
