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
  // The space the content belongs to (website|mobileapp|emailTool...).
  spaceCode: string;
  // The environment identifier (live | preview).
  environmentCode: string;
  // The content type unique code (page|post|menu|pages|posts|widgets|waterproof...).
  contentTypeCode: string;
  // List of codes that representing the content code (about-us|today-news|header|productId...).
  codes?: string | string[];
  // The targets and respective values that a content type is configured (contentzone:ROW | country:GB | language:en-GB | benefits:test).
  target?: Targets;
  // Sort content by (publicationDate:desc | publicationDate:asc | metadataCustom.eventDate:desc | metadataCustom.X:asc).
  sort?: string;
  // umber of the page to get, starting at 1. The default is 1.
  page?: number;
  // Size of each page, as a number between 1 and 180. The default is 60.
  pageSize?: number;
  // Filter by metadata tag. Separate multiple values with commas (,). For example, "red,dress".
  metadataSearchTagsValues?: string;
  // Filter by content custom metadata. Repeat the parameter for multiple values. For example,
  // (metadataCustom.eventDate=2020-07-21&metadataCustom.eventName=cosmos&metadataCustom.presenter=carl sagan,tyson neil degrasse).
  metadataCustom?: string;
};

export interface ComponentType {
  type: string;
  components?: ComponentType[];
  fields?: Record<string, unknown>;
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