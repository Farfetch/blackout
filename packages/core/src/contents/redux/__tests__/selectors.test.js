import * as fromReducer from '../reducer';
import * as selectors from '../selectors';
import {
  contentHash,
  contentQuery,
  expectedNormalizedPayload,
  mockContents,
  pathname,
  result,
  seoQuery,
  mockResponse as seoResponse,
} from 'tests/__fixtures__/contents';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('contents redux selectors', () => {
  const mockState = {
    contents: {
      error: { [contentHash]: 'Error - Content not loaded.' },
      isLoading: { [contentHash]: false },
      contentTypes: {
        isLoading: false,
        error: {},
        result,
      },
      metadata: {
        error: { [pathname]: 'Error - SEO not loaded.' },
        isLoading: { [pathname]: false },
        result: { ...seoResponse },
      },
    },
    entities: { ...expectedNormalizedPayload.entities },
  };

  describe('isContentLoading()', () => {
    it('should get the loading status of a given content by query', () => {
      const spy = jest.spyOn(fromReducer, 'getIsLoading');
      const expectedResult = mockState.contents.isLoading[contentHash];

      expect(selectors.isContentLoading(mockState, contentQuery)).toEqual(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getContentError()', () => {
    it('should get the content error property from state', () => {
      const spy = jest.spyOn(fromReducer, 'getError');
      const expectedResult = mockState.contents.error[contentHash];

      expect(selectors.getContentError(mockState, contentQuery)).toEqual(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getContentGroupByQuery()', () => {
    it('should get the content group according to the query', () => {
      const expectedResult =
        expectedNormalizedPayload.entities.contentGroups[contentHash];

      expect(selectors.getContentGroupByQuery(mockState, contentQuery)).toEqual(
        expectedResult,
      );
    });
  });

  describe('getContents()', () => {
    it('should get all the contents according the query - contentGroup received', () => {
      const expectedResult = mockContents.entries;

      expect(selectors.getContents(mockState, contentQuery)).toEqual(
        expectedResult,
      );
    });
  });

  describe('getAllContentTypes()', () => {
    it('should get all the content types', () => {
      const expected = result;

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
