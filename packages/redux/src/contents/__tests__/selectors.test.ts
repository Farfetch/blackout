import * as fromReducer from '../reducer';
import * as selectors from '../selectors';
import {
  contentHash,
  contentNormalizedPayload,
  contentPublicationId,
  contentQuery,
  contentTypesResult,
  pathname,
  seoQuery,
  seoResponse,
} from 'tests/__fixtures__/contents';
import { toBlackoutError } from '@farfetch/blackout-client';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('contents redux selectors', () => {
  const mockState = {
    contents: {
      searchResults: {
        [contentHash]: {
          error: null,
          isLoading: false,
          result: {
            ...contentNormalizedPayload.result,
          },
        },
      },
      contentTypes: {
        error: undefined,
        isLoading: false,
        result: contentTypesResult,
      },
      metadata: {
        error: {
          [pathname]: toBlackoutError(new Error('Error - SEO not loaded.')),
        },
        isLoading: {
          [pathname]: false,
        },
        result: { ...seoResponse },
      },
    },
    entities: {
      ...contentNormalizedPayload.entities,
    },
  };

  describe('getContentsByHash()', () => {
    it('should get a specific hash of a given content by query', () => {
      const spy = jest.spyOn(fromReducer, 'getContentResult');
      const expectedResult = mockState.contents.searchResults[contentHash];

      expect(selectors.getContentsByHash(mockState, contentHash)).toEqual(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('isContentLoading()', () => {
    it('should get the loading status of a given content by query', () => {
      const expectedResult =
        mockState.contents.searchResults[contentHash]?.isLoading;

      expect(selectors.isContentLoading(mockState, contentQuery)).toEqual(
        expectedResult,
      );
    });
  });

  describe('getContentError()', () => {
    it('should get the content error property from state', () => {
      const expectedResult =
        mockState.contents.searchResults[contentHash]?.error;

      expect(selectors.getContentError(mockState, contentQuery)).toEqual(
        expectedResult,
      );
    });
  });

  describe('getContentGroupByQuery()', () => {
    it('should get the content group according to the query', () => {
      const expectedResult =
        mockState.contents.searchResults[contentHash]?.result;

      expect(selectors.getContentByQuery(mockState, contentQuery)).toEqual(
        expectedResult,
      );
    });
  });

  describe('getContents()', () => {
    it('should get all the contents according to the query received', () => {
      const expectedResult = [
        contentNormalizedPayload.entities.contents[contentPublicationId],
      ];

      expect(selectors.getContents(mockState, contentQuery)).toEqual(
        expectedResult,
      );
    });
  });

  describe('getAllContentTypes()', () => {
    it('should get all the content types', () => {
      const expected = contentTypesResult;

      expect(selectors.getAllContentTypes(mockState)).toEqual(expected);
    });
  });

  describe('getSEOMetadataError()', () => {
    it('should get the SEO error property from state', () => {
      const spy = jest.spyOn(fromReducer, 'getSEOmetadata');
      const expectedResult = mockState?.contents?.metadata?.error[pathname];

      expect(selectors.getSEOMetadataError(mockState, seoQuery)).toEqual(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('isSEOMetadataLoading()', () => {
    it('should get the loading status of a given SEO metadata by query', () => {
      const spy = jest.spyOn(fromReducer, 'getSEOmetadata');
      const expectedResult = mockState.contents.metadata.isLoading[pathname];

      expect(selectors.isSEOMetadataLoading(mockState, seoQuery)).toEqual(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('isSEOMetadataFetched()', () => {
    it('should get the isFetched status of an existing SEO metadata by query', () => {
      const spy = jest.spyOn(fromReducer, 'getSEOmetadata');

      expect(selectors.isSEOMetadataFetched(mockState, seoQuery)).toEqual(true);
      expect(spy).toHaveBeenCalledTimes(2);
    });

    it('should get the isFetched status of a non existing SEO metadata by query', () => {
      const spy = jest.spyOn(fromReducer, 'getSEOmetadata');

      expect(
        selectors.isSEOMetadataFetched(mockState, { path: '/anotherPage' }),
      ).toEqual(false);
      expect(spy).toHaveBeenCalledTimes(2);
    });
  });

  describe('getSEOMetadataResult()', () => {
    it('should get all the SEO metadata accordion to the query received', () => {
      const spy = jest.spyOn(fromReducer, 'getSEOmetadata');
      const expectedResult = mockState.contents.metadata.result[pathname];

      expect(selectors.getSEOMetadataResult(mockState, seoQuery)).toEqual(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getContent()', () => {
    it('should return the content entity', () => {
      expect(selectors.getContent(mockState, contentHash)).toEqual(
        mockState.entities.contents[
          contentHash as keyof typeof mockState.entities.contents
        ],
      );
    });
  });
});
