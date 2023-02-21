import * as selectors from '../../selectors/searchDidYouMean';
import {
  mockSearchDidYouMeanErrorState,
  mockSearchDidYouMeanHash,
  mockSearchDidYouMeanInitialState,
  mockSearchDidYouMeanLoadingState,
  mockSearchDidYouMeanResponse,
  mockSearchDidYouMeanState,
} from 'tests/__fixtures__/search';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('search intents redux selectors', () => {
  const mockState = mockSearchDidYouMeanState;

  describe('areSearchIntentsLoading()', () => {
    it('should get the loading status of a given search', () => {
      const spy = jest.spyOn(selectors, 'isSearchDidYouMeanLoading');

      expect(
        selectors.isSearchDidYouMeanLoading(
          mockState,
          mockSearchDidYouMeanHash,
        ),
      ).toBe(false);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getSearchIntentsError()', () => {
    it('should get the search error property from state', () => {
      const expectedResult =
        mockState.search.didYouMean[mockSearchDidYouMeanHash].error;
      const spy = jest.spyOn(selectors, 'getSearchDidYouMeanError');

      expect(
        selectors.getSearchDidYouMeanError(mockState, mockSearchDidYouMeanHash),
      ).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getSearchIntentsResult()', () => {
    it('should get the result of a given search', () => {
      expect(
        selectors.getSearchDidYouMeanResult(
          mockState,
          mockSearchDidYouMeanHash,
        ),
      ).toEqual(mockSearchDidYouMeanResponse);
    });
  });

  describe('isSearchDidYouMeanFetched()', () => {
    it('should return true if fetched', () => {
      expect(
        selectors.isSearchDidYouMeanFetched(
          mockState,
          mockSearchDidYouMeanHash,
        ),
      ).toBe(true);
    });

    it('should return true if a fetch error occured', () => {
      expect(
        selectors.isSearchDidYouMeanFetched(
          mockSearchDidYouMeanErrorState,
          mockSearchDidYouMeanHash,
        ),
      ).toBe(true);
    });

    it('should return false if not fetched', () => {
      expect(
        selectors.isSearchDidYouMeanFetched(
          mockSearchDidYouMeanInitialState,
          mockSearchDidYouMeanHash,
        ),
      ).toBe(false);
    });

    it('should return false if is loading', () => {
      expect(
        selectors.isSearchDidYouMeanFetched(
          mockSearchDidYouMeanLoadingState,
          mockSearchDidYouMeanHash,
        ),
      ).toBe(false);
    });
  });
});
