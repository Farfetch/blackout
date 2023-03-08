import * as selectors from '../../selectors/searchIntents.js';
import {
  mockSearchIntentsErrorState,
  mockSearchIntentsHash,
  mockSearchIntentsInitialState,
  mockSearchIntentsLoadingState,
  mockSearchIntentsResponse,
  mockSearchIntentsState,
} from 'tests/__fixtures__/search/index.mjs';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('search intents redux selectors', () => {
  const mockState = mockSearchIntentsState;

  describe('areSearchIntentsLoading()', () => {
    it('should get the loading status of a given search', () => {
      const spy = jest.spyOn(selectors, 'areSearchIntentsLoading');

      expect(
        selectors.areSearchIntentsLoading(mockState, mockSearchIntentsHash),
      ).toBe(false);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getSearchIntentsError()', () => {
    it('should get the search error property from state', () => {
      const expectedResult =
        mockState.search.intents[mockSearchIntentsHash].error;
      const spy = jest.spyOn(selectors, 'getSearchIntentsError');

      expect(
        selectors.getSearchIntentsError(mockState, mockSearchIntentsHash),
      ).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getSearchIntentsResult()', () => {
    it('should get the result of a given search', () => {
      expect(
        selectors.getSearchIntentsResult(mockState, mockSearchIntentsHash),
      ).toEqual(mockSearchIntentsResponse);
    });
  });

  describe('areSearchIntentsFetched()', () => {
    it('should return true if fetched', () => {
      expect(
        selectors.areSearchIntentsFetched(mockState, mockSearchIntentsHash),
      ).toBe(true);
    });

    it('should return true if a fetch error occured', () => {
      expect(
        selectors.areSearchIntentsFetched(
          mockSearchIntentsErrorState,
          mockSearchIntentsHash,
        ),
      ).toBe(true);
    });

    it('should return false if not fetched', () => {
      expect(
        selectors.areSearchIntentsFetched(
          mockSearchIntentsInitialState,
          mockSearchIntentsHash,
        ),
      ).toBe(false);
    });

    it('should return false if is loading', () => {
      expect(
        selectors.areSearchIntentsFetched(
          mockSearchIntentsLoadingState,
          mockSearchIntentsHash,
        ),
      ).toBe(false);
    });
  });
});
