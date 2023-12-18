import { generateSEOFilesHash } from '@farfetch/blackout-redux';
import { SeoFileType } from '@farfetch/blackout-client';

export const seoFilesQuery = {
  name: 'siteSEOFiles',
  hostId: 1234,
  page: 1,
  pageSize: 60,
};

export const hash = generateSEOFilesHash(seoFilesQuery);

export const seoFileEntry = {
  name: 'siteSEOFiles.txt',
  path: 'siteSEOFiles.txt',
  uploadDate: '2023-05-11T15:56:05.712Z',
  hostId: 1234,
  subfolderStructure: '/en-US',
  type: SeoFileType.Pages,
  content: 'string',
};

export const seoFilesData = {
  number: 0,
  totalPages: 1,
  totalItems: 1,
  entries: [seoFileEntry],
};

export const seoFilesResponse = {
  [hash]: seoFilesData,
};
