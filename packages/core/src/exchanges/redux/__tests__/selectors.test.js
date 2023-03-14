import * as fromExchanges from '../reducer';
import * as selectors from '../selectors';

describe('exchanges redux selectors', () => {
  const mockState = {
    exchanges: {
      error: 'error: not loaded',
      result: 'mock result',
      isLoading: false,
      exchangeFilter: {
        error: 'error: not loaded',
        isLoading: false,
        result: 'mock result',
      },
      exchangeBookRequests: {
        error: 'error: not loaded',
        isLoading: false,
        result: 'mock result',
      },
    },
  };

  beforeEach(jest.clearAllMocks);

  describe('getResult()', () => {
    it('should get the result property from state', () => {
      const spy = jest.spyOn(fromExchanges, 'getResult');

      expect(selectors.getResult(mockState)).toEqual(
        mockState.exchanges.result,
      );
      expect(spy).toHaveBeenCalledWith(mockState.exchanges);
    });
  });

  describe('getExchangesError()', () => {
    it('should get the error property from state', () => {
      const spy = jest.spyOn(fromExchanges, 'getError');

      expect(selectors.getExchangesError(mockState)).toEqual(
        mockState.exchanges.error,
      );
      expect(spy).toHaveBeenCalledWith(mockState.exchanges);
    });
  });

  describe('isExchangesLoading()', () => {
    it('should get the loading property from state', () => {
      const spy = jest.spyOn(fromExchanges, 'getIsLoading');

      expect(selectors.isExchangesLoading(mockState)).toEqual(false);
      expect(spy).toHaveBeenCalledWith(mockState.exchanges);
    });
  });

  describe('getExchangeFilter()', () => {
    it('should get the exchange filter result property from state', () => {
      const spy = jest.spyOn(fromExchanges, 'getExchangeFilter');

      expect(selectors.getExchangeFilter(mockState)).toEqual(
        mockState.exchanges.exchangeFilter.result,
      );
      expect(spy).toHaveBeenCalledWith(mockState.exchanges);
    });

    it('should get the exchange filter error property from state', () => {
      const spy = jest.spyOn(fromExchanges, 'getExchangeFilter');

      expect(selectors.getExchangeFilterError(mockState)).toEqual(
        mockState.exchanges.exchangeFilter.error,
      );
      expect(spy).toHaveBeenCalledWith(mockState.exchanges);
    });

    it('should get the exchange filter isLoading property from state', () => {
      const spy = jest.spyOn(fromExchanges, 'getExchangeFilter');

      expect(selectors.isExchangeFilterLoading(mockState)).toEqual(
        mockState.exchanges.exchangeFilter.isLoading,
      );
      expect(spy).toHaveBeenCalledWith(mockState.exchanges);
    });
  });

  describe('getExchangeBookRequests()', () => {
    it('should get the exchange book requests result property from state', () => {
      const spy = jest.spyOn(fromExchanges, 'getExchangeBookRequests');

      expect(selectors.getExchangeBookRequests(mockState)).toEqual(
        mockState.exchanges.exchangeBookRequests.result,
      );
      expect(spy).toHaveBeenCalledWith(mockState.exchanges);
    });

    it('should get the exchange book requests error property from state', () => {
      const spy = jest.spyOn(fromExchanges, 'getExchangeBookRequests');

      expect(selectors.getExchangeBookRequestsError(mockState)).toEqual(
        mockState.exchanges.exchangeBookRequests.error,
      );
      expect(spy).toHaveBeenCalledWith(mockState.exchanges);
    });

    it('should get the exchange book requests isLoading property from state', () => {
      const spy = jest.spyOn(fromExchanges, 'getExchangeBookRequests');

      expect(selectors.isExchangeBookRequestsLoading(mockState)).toEqual(
        mockState.exchanges.exchangeBookRequests.isLoading,
      );
      expect(spy).toHaveBeenCalledWith(mockState.exchanges);
    });
  });
});
