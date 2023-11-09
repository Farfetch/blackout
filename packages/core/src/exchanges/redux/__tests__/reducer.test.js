import * as fromReducer from '../reducer';
import {
  exchangeFilterId,
  orderId,
  orderItemUuid,
} from '../__fixtures__/exchanges.fixtures';
import { getInitialState } from '../../../../tests';
import { LOGOUT_SUCCESS } from '../../../authentication/redux/actionTypes';
import { reducerAssertions } from '../../../../tests/helpers';
import reducer, { actionTypes, entitiesMapper } from '..';

let initialState;

describe('exchanges reducer', () => {
  beforeEach(() => {
    initialState = getInitialState(reducer());
  });

  describe('error() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().error;

      expect(state).toBe(initialState.error);
      expect(state).toBeNull();
    });

    it.each([
      actionTypes.CREATE_EXCHANGE_REQUEST,
      actionTypes.GET_EXCHANGE_REQUEST,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(
          {
            error: 'previous error',
          },
          {
            type: actionType,
          },
        ).error,
      ).toBe(initialState.error);
    });

    it.each([
      actionTypes.CREATE_EXCHANGE_FAILURE,
      actionTypes.GET_EXCHANGE_FAILURE,
    ])('should handle %s action type', actionType => {
      const error = 'foo';
      expect(
        reducer(undefined, {
          payload: { error },
          type: actionType,
        }).error,
      ).toBe(error);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { error: 'foo' };

      expect(reducer(state).error).toBe(state.error);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().isLoading;

      expect(state).toBe(initialState.isLoading);
      expect(state).toBe(false);
    });

    it.each([
      actionTypes.CREATE_EXCHANGE_REQUEST,
      actionTypes.GET_EXCHANGE_REQUEST,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          type: actionType,
        }).isLoading,
      ).toBe(true);
    });

    it.each([
      actionTypes.CREATE_EXCHANGE_SUCCESS,
      actionTypes.GET_EXCHANGE_SUCCESS,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          payload: { result: '' },
          type: actionType,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it.each([
      actionTypes.CREATE_EXCHANGE_FAILURE,
      actionTypes.GET_EXCHANGE_FAILURE,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          payload: { error: '' },
          type: actionType,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { isLoading: 'foo' };

      expect(reducer(state).isLoading).toBe(state.isLoading);
    });
  });

  describe('result() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().result;

      expect(state).toBe(initialState.result);
      expect(state).toBeNull();
    });

    it.each([
      actionTypes.CREATE_EXCHANGE_SUCCESS,
      actionTypes.GET_EXCHANGE_SUCCESS,
    ])('should handle %s action type', actionType => {
      const expectedResult = 'foo';
      const state = {
        ...initialState,
        isLoading: true,
      };

      expect(
        reducer(state, {
          payload: expectedResult,
          type: actionType,
        }).result,
      ).toBe(expectedResult);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { result: 'foo' };

      expect(reducer(state).result).toBe(state.result);
    });
  });

  describe('exchangeFilters() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().exchangeFilters;

      expect(state).toEqual(initialState.exchangeFilters);
      expect(state).toEqual({ error: {}, isLoading: {} });
    });

    it('should handle CREATE_EXCHANGE_FILTER_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          meta: { orderItemUuid },
          type: actionTypes.CREATE_EXCHANGE_FILTER_REQUEST,
        }).exchangeFilters,
      ).toEqual({
        error: { [orderItemUuid]: null },
        isLoading: { [orderItemUuid]: true },
      });
    });

    it('should handle CREATE_EXCHANGE_FILTER_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          meta: { orderItemUuid },
          type: actionTypes.CREATE_EXCHANGE_FILTER_FAILURE,
          payload: { error: '' },
        }).exchangeFilters,
      ).toEqual({
        error: { [orderItemUuid]: '' },
        isLoading: { [orderItemUuid]: false },
      });
    });

    it('should handle CREATE_EXCHANGE_FILTER_FAILURE action type without orderItemUuid', () => {
      expect(
        reducer(undefined, {
          meta: { orderItemUuid: '' },
          type: actionTypes.CREATE_EXCHANGE_FILTER_FAILURE,
          payload: { error: '' },
        }).exchangeFilters,
      ).toEqual({
        error: { '': '' },
        isLoading: { '': false },
      });
    });

    it('should handle CREATE_EXCHANGE_FILTER_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          meta: { orderItemUuid },
          type: actionTypes.CREATE_EXCHANGE_FILTER_SUCCESS,
        }).exchangeFilters,
      ).toEqual({ error: {}, isLoading: { [orderItemUuid]: false } });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { exchangeFilters: { isLoading: { foo: false } } };

      expect(reducer(state).exchangeFilters).toEqual(state.exchangeFilters);
    });
  });

  describe('getError() selector', () => {
    it('should return the `error` property from a given state', () => {
      const error = 'foo';

      expect(fromReducer.getError({ error })).toBe(error);
    });
  });

  describe('getIsLoading() selector', () => {
    it('should return the `isLoading` property from a given state', () => {
      const isLoading = 'foo';

      expect(fromReducer.getIsLoading({ isLoading })).toBe(isLoading);
    });
  });

  describe('getResult() selector', () => {
    it('should return the `result` property from a given state', () => {
      const result = 'foo';

      expect(fromReducer.getResult({ result })).toBe(result);
    });
  });

  describe('getExchangeFilters() selector', () => {
    it('should return the `exchangeFilters` property from a given state', () => {
      const exchangeFilters = 'foo';

      expect(fromReducer.getExchangeFilters({ exchangeFilters })).toBe(
        exchangeFilters,
      );
    });
  });

  describe('getExchangeBookRequests() selector', () => {
    it('should return the `exchangeBookRequests` property from a given state', () => {
      const exchangeBookRequests = 'foo';

      expect(
        fromReducer.getExchangeBookRequests({ exchangeBookRequests }),
      ).toBe(exchangeBookRequests);
    });
  });

  describe('Sub-areas WITHOUT result property', () => {
    const subAreaResult = {
      error: {},
      isLoading: {},
    };

    const subAreas = {
      exchangeFilters: { ...subAreaResult },
    };

    const subAreaNames = ['ExchangeFilters'];

    reducerAssertions.assertSubAreasReducer(
      fromReducer,
      subAreaNames,
      subAreas,
      subAreaResult,
    );
  });

  describe('Sub-areas WITH result property', () => {
    const subAreaResult = {
      result: null,
      error: null,
      isLoading: false,
    };

    const subAreas = {
      exchangeBookRequests: { ...subAreaResult },
    };

    const subAreaNames = ['ExchangeBookRequests'];

    reducerAssertions.assertSubAreasReducer(
      fromReducer,
      subAreaNames,
      subAreas,
      subAreaResult,
    );
  });

  describe('entitiesMapper()', () => {
    describe('reset exchange filters', () => {
      const state = {
        exchangeFilters: {
          [orderItemUuid]: {
            id: exchangeFilterId,
            exchangeFilterItems: [
              {
                orderCode: [orderId],
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
      };

      const expectedResult = {};

      it('should handle RESET_EXCHANGE_FILTERS_ENTITIES action type', () => {
        expect(
          entitiesMapper[actionTypes.RESET_EXCHANGE_FILTERS_ENTITIES](state, {
            type: actionTypes.RESET_EXCHANGE_FILTERS_ENTITIES,
          }),
        ).toEqual(expectedResult);
      });

      it('should handle LOGOUT_SUCCESS action type', () => {
        expect(
          entitiesMapper[LOGOUT_SUCCESS](state, {
            type: LOGOUT_SUCCESS,
          }),
        ).toEqual(expectedResult);
      });
    });
  });
});
