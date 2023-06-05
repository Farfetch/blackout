import * as fromExchanges from '../reducer.js';
import * as selectors from '../selectors.js';
import { mockState } from 'tests/__fixtures__/exchanges/index.mjs';
import { toBlackoutError } from '@farfetch/blackout-client';

describe('exchanges redux selectors', () => {
  beforeEach(jest.clearAllMocks);

  describe('getExchange()', () => {
    it('should get the exchange from state', () => {
      const expectedResult = mockState.exchanges.result;
      const spy = jest.spyOn(fromExchanges, 'getResult');

      expect(selectors.getExchange(mockState)).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('isExchangesLoading()', () => {
    it('should get the return loading property from state', () => {
      const expectedResult = mockState.exchanges.isLoading;
      const spy = jest.spyOn(fromExchanges, 'getIsLoading');

      expect(selectors.areExchangesLoading(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getExchangesError()', () => {
    it('should get the exchanges error property from state', () => {
      const expectedResult = mockState.exchanges.error;
      const spy = jest.spyOn(fromExchanges, 'getError');

      expect(selectors.getExchangeError(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('isExchangeFetched()', () => {
    it('should return true if the exchange fetch request succeeded', () => {
      expect(selectors.isExchangeFetched(mockState)).toBe(true);
    });

    it('should return true if the exchange fetch request failed', () => {
      const mockStateWithError = {
        ...mockState,
        exchanges: {
          ...mockState.exchanges,
          error: toBlackoutError(new Error('error')),
        },
      };

      expect(selectors.isExchangeFetched(mockStateWithError)).toBe(true);
    });

    it('should return false if there is an ongoing fetch request', () => {
      const mockStateLoading = {
        ...mockState,
        exchanges: {
          ...mockState.exchanges,
          isLoading: true,
        },
      };

      expect(selectors.isExchangeFetched(mockStateLoading)).toBe(false);
    });
  });

  describe('getExchangeFilter()', () => {
    it('should get the exchange from state', () => {
      const expectedResult = mockState.exchanges.exchangeFilter.result;
      const spy = jest.spyOn(fromExchanges, 'getExchangeFilter');

      expect(selectors.getExchangeFilter(mockState)).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('isExchangeFilterLoading()', () => {
    it('should get the exchange filters loading property from state', () => {
      const expectedResult = mockState.exchanges.exchangeFilter.isLoading;
      const spy = jest.spyOn(fromExchanges, 'getExchangeFilter');

      expect(selectors.isExchangeFilterLoading(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getExchangeFilterError()', () => {
    it('should get the exchanges error property from state', () => {
      const expectedResult = mockState.exchanges.exchangeFilter.error;
      const spy = jest.spyOn(fromExchanges, 'getExchangeFilter');

      expect(selectors.getExchangeFilterError(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getExchangeBookRequest()', () => {
    it('should get the exchange from state', () => {
      const expectedResult = mockState.exchanges.exchangeBookRequest.result;
      const spy = jest.spyOn(fromExchanges, 'getExchangeBookRequest');

      expect(selectors.getExchangeBookRequest(mockState)).toEqual(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('isExchangeBookRequestLoading()', () => {
    it('should get the exchange filters loading property from state', () => {
      const expectedResult = mockState.exchanges.exchangeBookRequest.isLoading;
      const spy = jest.spyOn(fromExchanges, 'getExchangeBookRequest');

      expect(selectors.isExchangeBookRequestLoading(mockState)).toBe(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getExchangeBookRequestError()', () => {
    it('should get the exchanges error property from state', () => {
      const expectedResult = mockState.exchanges.exchangeBookRequest.error;
      const spy = jest.spyOn(fromExchanges, 'getExchangeBookRequest');

      expect(selectors.getExchangeBookRequestError(mockState)).toBe(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('isExchangeBookRequestFetched()', () => {
    it('should return true if the exchange book request fetch request succeeded', () => {
      expect(selectors.isExchangeBookRequestFetched(mockState)).toBe(true);
    });

    it('should return true if the exchange book request fetch request failed', () => {
      const mockStateWithError = {
        ...mockState,
        exchanges: {
          ...mockState.exchanges,
          exchangeBookRequest: {
            ...mockState.exchanges.exchangeBookRequest,
            error: toBlackoutError(new Error('error')),
          },
        },
      };

      expect(selectors.isExchangeBookRequestFetched(mockStateWithError)).toBe(
        true,
      );
    });

    it('should return false if there is an ongoing fetch request', () => {
      const mockStateLoading = {
        ...mockState,
        exchanges: {
          ...mockState.exchanges,
          exchangeBookRequest: {
            ...mockState.exchanges.exchangeBookRequest,
            isLoading: true,
          },
        },
      };

      expect(selectors.isExchangeBookRequestFetched(mockStateLoading)).toBe(
        false,
      );
    });
  });
});
