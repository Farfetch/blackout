import * as actionTypes from '../actionTypes.js';
import {
  ExchangeBookRequestStatus,
  ExchangeFilterLogicOperatorComparator,
  ExchangeFilterLogicOperatorCriteria,
  ExchangeFilterLogicOperatorType,
  toBlackoutError,
} from '@farfetch/blackout-client';
import {
  exchangeReturnItemId,
  mockState,
  orderId,
  orderItemUuid,
  returnId,
} from 'tests/__fixtures__/exchanges/index.mjs';
import { LOGOUT_SUCCESS } from '../../users/authentication/actionTypes.js';
import reducer, * as fromReducer from '../reducer.js';
import type { ExchangesState } from '../types/index.js';

let initialState: ExchangesState;
const randomAction = { type: 'this_is_a_random_action' };

describe('exchanges reducer', () => {
  beforeEach(() => {
    initialState = fromReducer.INITIAL_STATE;
  });

  describe('reset handling', () => {
    it.each([actionTypes.RESET_EXCHANGES, LOGOUT_SUCCESS])(
      'should return initial state on %s action',
      actionType => {
        expect(
          reducer(mockState.exchanges, { type: actionType, payload: {} }),
        ).toMatchObject(initialState);
      },
    );
  });

  describe('error() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).error;

      expect(state).toBe(initialState.error);
      expect(state).toBeNull();
    });

    it.each([
      actionTypes.CREATE_EXCHANGE_REQUEST,
      actionTypes.FETCH_EXCHANGE_REQUEST,
    ])('should handle %s action type', actionType => {
      const state = {
        ...initialState,
        error: toBlackoutError(new Error('error')),
      };

      expect(
        reducer(state, {
          type: actionType,
        }).error,
      ).toBe(initialState.error);
    });

    it.each([
      actionTypes.CREATE_EXCHANGE_FAILURE,
      actionTypes.FETCH_EXCHANGE_FAILURE,
    ])('should handle %s action type', actionType => {
      const state = {
        ...initialState,
        error: null,
      };
      const error = 'foo';

      expect(
        reducer(state, {
          payload: { error },
          type: actionType,
        }).error,
      ).toBe(error);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...initialState,
        error: toBlackoutError(new Error('error')),
      };

      expect(reducer(state, randomAction).error).toBe(state.error);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).isLoading;

      expect(state).toBe(initialState.isLoading);
      expect(state).toBe(false);
    });

    it.each([
      actionTypes.CREATE_EXCHANGE_REQUEST,
      actionTypes.FETCH_EXCHANGE_REQUEST,
    ])('should handle %s action type', actionType => {
      const state = {
        ...initialState,
        isLoading: false,
      };

      expect(
        reducer(state, {
          type: actionType,
        }).isLoading,
      ).toBe(true);
    });

    it.each([
      actionTypes.CREATE_EXCHANGE_SUCCESS,
      actionTypes.FETCH_EXCHANGE_SUCCESS,
    ])('should handle %s action type', actionType => {
      const state = {
        ...initialState,
        isLoading: true,
      };

      expect(
        reducer(state, {
          payload: { result: '' },
          type: actionType,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it.each([
      actionTypes.CREATE_EXCHANGE_FAILURE,
      actionTypes.FETCH_EXCHANGE_FAILURE,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          payload: { error: '' },
          type: actionType,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { ...initialState, isLoading: false };

      expect(reducer(state, randomAction).isLoading).toBe(state.isLoading);
    });
  });

  describe('exchangeFilter() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).exchangeFilter;

      expect(state).toEqual(initialState.exchangeFilter);
      expect(state).toEqual({ error: null, isLoading: false, result: null });
    });

    it('should handle CREATE_EXCHANGE_FILTER_REQUEST action type', () => {
      const state: ExchangesState = {
        ...fromReducer.INITIAL_STATE,
        exchangeFilter: {
          error: toBlackoutError(new Error('dummy error')),
          isLoading: false,
          result: null,
        },
      };

      expect(
        reducer(state, {
          type: actionTypes.CREATE_EXCHANGE_FILTER_REQUEST,
        }).exchangeFilter,
      ).toEqual({
        error: null,
        isLoading: true,
      });
    });

    it('should handle CREATE_EXCHANGE_FILTER_FAILURE action type', () => {
      const state: ExchangesState = {
        ...fromReducer.INITIAL_STATE,
        exchangeFilter: {
          error: null,
          isLoading: true,
          result: null,
        },
      };

      expect(
        reducer(state, {
          type: actionTypes.CREATE_EXCHANGE_FILTER_FAILURE,
          payload: { error: toBlackoutError(new Error('dummy error')) },
        }).exchangeFilter,
      ).toEqual({
        error: toBlackoutError(new Error('dummy error')),
        isLoading: false,
      });
    });

    it('should handle CREATE_EXCHANGE_FILTER_SUCCESS action type', () => {
      const state: ExchangesState = {
        ...fromReducer.INITIAL_STATE,
        exchangeFilter: {
          error: null,
          isLoading: true,
          result: null,
        },
      };

      const expectedResult = {
        id: '123456',
        exchangeFilterItems: [
          {
            orderCode: orderId,
            orderItemUuid: orderItemUuid,
          },
        ],
        logicOperator: {
          logicOperatorType: ExchangeFilterLogicOperatorType.And,
          operators: [
            {
              criteria: ExchangeFilterLogicOperatorCriteria.MerchantId,
              comparator: ExchangeFilterLogicOperatorComparator.Equals,
              value: 'merchantId',
            },
          ],
        },
      };

      expect(
        reducer(state, {
          type: actionTypes.CREATE_EXCHANGE_FILTER_SUCCESS,
          payload: expectedResult,
        }).exchangeFilter,
      ).toEqual({
        error: null,
        isLoading: false,
        result: expectedResult,
      });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...initialState,
        exchangeFilter: { error: null, isLoading: false, result: null },
      };

      expect(reducer(state, randomAction).exchangeFilter).toEqual(
        state.exchangeFilter,
      );
    });
  });

  describe('exchangeBookRequest() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).exchangeBookRequest;

      expect(state).toEqual(initialState.exchangeBookRequest);
      expect(state).toEqual({ error: null, isLoading: false, result: null });
    });

    it('should handle FETCH_EXCHANGE_BOOK_REQUEST_REQUEST action type', () => {
      const state: ExchangesState = {
        ...fromReducer.INITIAL_STATE,
        exchangeBookRequest: {
          error: toBlackoutError(new Error('dummy error')),
          isLoading: false,
          result: null,
        },
      };

      expect(
        reducer(state, {
          type: actionTypes.FETCH_EXCHANGE_BOOK_REQUEST_REQUEST,
        }).exchangeBookRequest,
      ).toEqual({
        error: null,
        isLoading: true,
      });
    });

    it('should handle FETCH_EXCHANGE_BOOK_REQUEST_FAILURE action type', () => {
      const state: ExchangesState = {
        ...fromReducer.INITIAL_STATE,
        exchangeBookRequest: {
          error: null,
          isLoading: true,
          result: null,
        },
      };

      expect(
        reducer(state, {
          type: actionTypes.FETCH_EXCHANGE_BOOK_REQUEST_FAILURE,
          payload: { error: toBlackoutError(new Error('dummy error')) },
        }).exchangeBookRequest,
      ).toEqual({
        error: toBlackoutError(new Error('dummy error')),
        isLoading: false,
      });
    });

    it('should handle FETCH_EXCHANGE_BOOK_REQUEST_SUCCESS action type', () => {
      const state: ExchangesState = {
        ...fromReducer.INITIAL_STATE,
        exchangeBookRequest: {
          error: null,
          isLoading: true,
          result: null,
        },
      };

      const expectedResult = {
        id: '12345',
        status: ExchangeBookRequestStatus.Success,
        exchangeReturnAssociations: [
          {
            exchangeReturnItemId,
            returnId,
          },
        ],
      };

      expect(
        reducer(state, {
          type: actionTypes.FETCH_EXCHANGE_BOOK_REQUEST_SUCCESS,
          payload: expectedResult,
        }).exchangeBookRequest,
      ).toEqual({
        error: null,
        isLoading: false,
        result: expectedResult,
      });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...initialState,
        exchangeBookRequest: { error: null, isLoading: false, result: null },
      };

      expect(reducer(state, randomAction).exchangeBookRequest).toEqual(
        state.exchangeBookRequest,
      );
    });
  });

  describe('getError() selector', () => {
    it('should return the `error` property from a given state', () => {
      expect(fromReducer.getError(initialState)).toBe(initialState.error);
    });
  });

  describe('getIsLoading() selector', () => {
    it('should return the `isLoading` property from a given state', () => {
      expect(fromReducer.getIsLoading(initialState)).toBe(
        initialState.isLoading,
      );
    });
  });

  describe('getResult() selector', () => {
    it('should return the `result` property from a given state', () => {
      expect(fromReducer.getResult(initialState)).toBe(initialState.result);
    });
  });

  describe('getExchangeFilter() selector', () => {
    it('should return the `exchangeFilter` property from a given state', () => {
      expect(fromReducer.getExchangeFilter(initialState)).toBe(
        initialState.exchangeFilter,
      );
    });
  });

  describe('getExchangeBookRequest() selector', () => {
    it('should return the `exchangeBookRequest` property from a given state', () => {
      expect(fromReducer.getExchangeBookRequest(initialState)).toBe(
        initialState.exchangeBookRequest,
      );
    });
  });
});
