import * as fromExchanges from '../reducer.js';
import * as selectors from '../selectors.js';
import { mockState } from 'tests/__fixtures__/exchanges/index.mjs';

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
});
