import * as fromReducer from '../reducer';
import * as selectors from '../selectors';
import {
  contentHash,
  contentNormalizedPayload,
  contentQuery,
  contentTypesResult,
  mockContentResult,
  pathname,
  seoQuery,
  seoResponse,
} from 'tests/__fixtures__/contents';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('contents redux selectors', () => {
  const mockState = {
    contents: {
      searchResults: {
        [contentHash]: {
          error: 'Error - Content not loaded.',
          isLoading: false,
          result: {
            ...mockContentResult,
            hash: 'foo',
          },
        },
      },
      contentTypes: {
        isLoading: false,
        error: {},
        result: contentTypesResult,
      },
      metadata: {
        error: { [pathname]: 'Error - SEO not loaded.' },
        isLoading: { [pathname]: false },
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
        contentNormalizedPayload.entities.contents[contentHash],
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

  describe('getSEOError()', () => {
    it('should get the SEO error property from state', () => {
      const spy = jest.spyOn(fromReducer, 'getSEOmetadata');
      const expectedResult = mockState.contents.metadata.error[pathname];

      expect(selectors.getSEOError(mockState, seoQuery)).toEqual(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('isSEOLoading()', () => {
    it('should get the loading status of a given SEO metadata by query', () => {
      const spy = jest.spyOn(fromReducer, 'getSEOmetadata');
      const expectedResult = mockState.contents.metadata.isLoading[pathname];

      expect(selectors.isSEOLoading(mockState, seoQuery)).toEqual(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getSEO()', () => {
    it('should get all the SEO metadata accordion to the query received', () => {
      const spy = jest.spyOn(fromReducer, 'getSEOmetadata');
      const expectedResult = mockState.contents.metadata.result[pathname];

      expect(selectors.getSEO(mockState, seoQuery)).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
