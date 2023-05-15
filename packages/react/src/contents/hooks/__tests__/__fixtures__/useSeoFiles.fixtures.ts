import { type BlackoutError, SeoFileType } from '@farfetch/blackout-client';
import { generateSEOFilesHash } from '@farfetch/blackout-redux';
import { mockInitialState } from './useSeoMetadata.fixtures.js';
import { seoFilesQuery } from 'tests/__fixtures__/contents/seoFiles.fixtures.mjs';

const contentSEOFilesHash = generateSEOFilesHash(seoFilesQuery);

export const mockSEOFilesState = {
  contents: {
    ...mockInitialState.contents,
    seoFiles: {
      error: {},
      isLoading: {},
      result: {
        [contentSEOFilesHash]: {
          number: 1,
          totalItems: 1,
          totalPages: 1,
          entries: [
            {
              name: 'string',
              path: 'string',
              uploadDate: '2023-05-23T17:47:02.770Z',
              hostId: 0,
              subfolderStructure: 'string',
              type: SeoFileType.None,
              content: 'string',
            },
          ],
        },
      },
    },
  },
};

export const mockSEOFilesLoadingState = {
  contents: {
    ...mockInitialState.contents,
    seoFiles: {
      isLoading: { [contentSEOFilesHash]: true },
      error: {},
      data: undefined,
      isFetched: false,
    },
  },
};

export const mockSEOFilesErrorState = {
  contents: {
    ...mockInitialState.contents,
    seoFiles: {
      isLoading: {},
      error: { [contentSEOFilesHash]: new Error('Error') as BlackoutError },
      data: undefined,
      isFetched: true,
    },
  },
};

export const result = {
  error: undefined,
  isLoading: false,
  isFetched: true,
  data: {
    entries: [
      {
        name: 'string',
        path: 'string',
        uploadDate: '2023-05-23T17:47:02.770Z',
        hostId: 0,
        subfolderStructure: 'string',
        type: SeoFileType.None,
        content: 'string',
      },
    ],
    number: 1,
    totalItems: 1,
    totalPages: 1,
  },
  actions: {
    fetch: expect.any(Function),
  },
};
