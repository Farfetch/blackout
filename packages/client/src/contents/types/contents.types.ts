import type { Config, PagedResponse } from '../../types/index.js';

export type Targets = {
  contentzone?: string;
  language?: string;
  country?: string;
  benefits?: string;
  channel?: string;
  segments?: string;
} & Record<string, string | undefined>;

export type QuerySearchContents = {
  // The space the content belongs to (website|mobileapp|emailTool...).
  spaceCode?: string;
  // The environment identifier (live | preview).
  environmentCode?: string;
  // The content type unique code (page|post|menu|pages|posts|widgets|waterproof...).
  contentTypeCode?: string;
  // List of codes that representing the content code (about-us|today-news|header|productId...).
  codes?: string | string[];
  // The targets and respective values that a content type is configured (contentzone:ROW | country:GB | language:en-GB | benefits:test | segments: 'private-sale,private-sale-guest-user').  // The segments list should contain less than 10 strings. They should separated by a comma (,).
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

export type ComponentType = {
  type: string;
  components?: ComponentType[];
  fields?: Record<string, unknown>;
  content?: string;
  customType?: string;
  value?: string | number | boolean;
  hex?: string;
  name?: string;
  displayOptions?: Record<string, string>;
};

export type ContentMetadata = {
  custom?: Record<string, string>;
};

export type ContentEntry<T = ComponentType[]> = {
  publicationId: string;
  publicationDate: string;
  versionId: string;
  spaceCode: string;
  metadata?: ContentMetadata;
  target?: Targets;
  contentTypeCode: string;
  environmentCode: string;
  code: string;
  ranking?: number;
  components: T;
};

export type Contents = PagedResponse<ContentEntry>;

export type GetSearchContents = (
  query?: QuerySearchContents,
  config?: Config,
) => Promise<Contents>;
