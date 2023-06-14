import * as fromReducer from '../reducer';
import { getInitialState } from '../../../../tests';
import reducer, { actionTypes } from '..';

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

  describe('getExchangeFilter() selector', () => {
    it('should return the `exchangeFilter` property from a given state', () => {
      const exchangeFilter = 'foo';

      expect(fromReducer.getExchangeFilter({ exchangeFilter })).toBe(
        exchangeFilter,
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

  describe('Sub-areas', () => {
    const subAreaResult = {
      result: null,
      error: null,
      isLoading: false,
    };

    const subAreas = {
      exchangeFilter: { ...subAreaResult },
      exchangeBookRequests: { ...subAreaResult },
    };

    const subAreaNames = ['ExchangeFilter', 'ExchangeBookRequests'];

    it.each(subAreaNames)(
      'return the `%s` property from a given state',
      subArea => {
        const { [`get${subArea}`]: reducerSelector } = fromReducer;
        expect(reducerSelector(subAreas)).toEqual(subAreaResult);
      },
    );
  });
});
