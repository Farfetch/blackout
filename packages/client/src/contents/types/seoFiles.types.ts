import type { Config, PagedResponse } from '../../types/index.js';

export type GetSEOFiles = (
  query: GetSEOFilesQuery,
  config?: Config,
) => Promise<SEOFiles>;

export enum SeoFileType {
  None = 'None',
  Sitemap = 'Sitemap',
  Homepage = 'Homepage',
  Pages = 'Pages',
  Posts = 'Posts',
  Products = 'Products',
  Sets = 'Sets',
  Other = 'Other',
  CustomContentTypes = 'CustomContentTypes',
  Categories = 'Categories',
}

export type GetSEOFilesQuery = {
  // The name (also named as "slug" on legacy CMS)
  name: string;
  // The hostId
  hostId: number;
  // Number of the page to get, starting at 1. The default is 1.
  page?: number;
  // Size of each page, as a number between 1 and 180. The default is 60.
  pageSize?: number;
};

export type SEOFiles = PagedResponse<SEOFile>;

export type SEOFile = {
  name: string;
  path?: string;
  uploadDate: string;
  hostId: number;
  subfolderStructure?: string;
  type: SeoFileType;
  content?: string;
};
