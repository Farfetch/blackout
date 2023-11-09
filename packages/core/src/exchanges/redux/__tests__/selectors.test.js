import * as fromEntities from '../../../entities/redux/selectors/entity';
import * as fromExchanges from '../reducer';
import * as selectors from '../selectors';
import {
  exchangeFilterId,
  orderId,
  orderItemUuid,
} from '../__fixtures__/exchanges.fixtures';

describe('exchanges redux selectors', () => {
  const mockState = {
    exchanges: {
      error: 'error: not loaded',
      result: 'mock result',
      isLoading: false,
      exchangeFilters: {
        error: { [orderItemUuid]: null, '': null },
        isLoading: { [orderItemUuid]: false, '': false },
      },
      exchangeBookRequests: {
        error: 'error: not loaded',
        isLoading: false,
        result: 'mock result',
      },
    },
    entities: {
      exchangeFilters: {
        [orderItemUuid]: {
          id: exchangeFilterId,
          exchangeFilterItems: [
            {
              orderCode: orderId,
              orderItemUuid: orderItemUuid,
            },
          ],
          filters: [
            {
              criteria: 'ProductId',
              comparator: 'Equals',
              values: '18061196',
            },
            {
              criteria: 'Price',
              comparator: 'LessThanOrEqual',
              values: '1.0',
            },
          ],
        },
      },
    },
    result: orderItemUuid,
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

  describe('getExchangeFilters()', () => {
    it('should get the exchange filters from state', () => {
      const expectedResult = mockState.entities.exchangeFilters;
      const spy = jest.spyOn(fromEntities, 'getEntity');

      expect(selectors.getExchangeFilters(mockState)).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(mockState, 'exchangeFilters');
    });
  });

  describe('getExchangeFilterById()', () => {
    it('should get the exchange filter by id from state', () => {
      const spy = jest.spyOn(fromEntities, 'getEntity');

      expect(selectors.getExchangeFilterById(mockState, orderItemUuid)).toEqual(
        mockState.entities.exchangeFilters[orderItemUuid],
      );
      expect(spy).toHaveBeenCalledWith(
        mockState,
        'exchangeFilters',
        orderItemUuid,
      );
    });
  });

  describe('getExchangeFilter()', () => {
    it('should get the exchange filter error property from state', () => {
      const spy = jest.spyOn(fromExchanges, 'getExchangeFilters');

      expect(
        selectors.getExchangeFilterError(mockState, orderItemUuid),
      ).toEqual(mockState.exchanges.exchangeFilters.error[orderItemUuid]);
      expect(spy).toHaveBeenCalledWith(mockState.exchanges);
    });

    it('should get the exchange filter error property from state without an orderItemUuid', () => {
      const spy = jest.spyOn(fromExchanges, 'getExchangeFilters');

      expect(selectors.getExchangeFilterError(mockState)).toEqual(
        mockState.exchanges.exchangeFilters.error[''],
      );
      expect(spy).toHaveBeenCalledWith(mockState.exchanges);
    });

    it('should get the exchange filter isLoading property from state', () => {
      const spy = jest.spyOn(fromExchanges, 'getExchangeFilters');

      expect(
        selectors.isExchangeFilterLoading(mockState, orderItemUuid),
      ).toEqual(mockState.exchanges.exchangeFilters.isLoading[orderItemUuid]);
      expect(spy).toHaveBeenCalledWith(mockState.exchanges);
    });

    it('should get the exchange filter isLoading property from state without an orderItemUuid', () => {
      const spy = jest.spyOn(fromExchanges, 'getExchangeFilters');

      expect(selectors.isExchangeFilterLoading(mockState)).toEqual(
        mockState.exchanges.exchangeFilters.isLoading[''],
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
