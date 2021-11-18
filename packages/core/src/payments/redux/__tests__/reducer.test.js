import * as fromReducer from '../reducer';
import { getInitialState } from '../../../../tests';
import { reducerAssertions } from '../../../../tests/helpers';
import reducer, { actionTypes, entitiesMapper } from '..';

let initialState;

describe('payments reducer', () => {
  describe('Payment Tokens reducers', () => {
    beforeEach(() => {
      initialState = getInitialState(reducer()).tokens;
    });

    describe('ERRORS', () => {
      it.each([
        actionTypes.GET_PAYMENT_TOKENS_FAILURE,
        actionTypes.DELETE_PAYMENT_TOKEN_FAILURE,
      ])('should handle %s action type', actionType => {
        const expectedResult = 'foo';
        const reducerResult = reducer(undefined, {
          payload: { error: expectedResult },
          type: actionType,
        }).tokens;

        expect(reducerResult.error).toBe(expectedResult);
      });
    });

    describe('REQUESTS', () => {
      it.each([
        actionTypes.GET_PAYMENT_TOKENS_REQUEST,
        actionTypes.DELETE_PAYMENT_TOKEN_REQUEST,
      ])('should handle %s action type', actionType => {
        const reducerResult = reducer(undefined, { type: actionType }).tokens;

        expect(reducerResult.isLoading).toBe(true);
        expect(reducerResult.error).toBe(initialState.error);
      });
    });

    describe('SUCCESS', () => {
      it('should handle GET_PAYMENT_TOKENS_SUCCESS action type', () => {
        const expectedResult = 'foo';
        const reducerResult = reducer(undefined, {
          payload: { result: expectedResult },
          type: actionTypes.GET_PAYMENT_TOKENS_SUCCESS,
        }).tokens;

        expect(reducerResult.result).toBe(expectedResult);
        expect(reducerResult.isLoading).toBe(false);
      });

      it('should handle DELETE_PAYMENT_TOKEN_SUCCESS action type', () => {
        const idTokenToRemove = 'idToken1';
        const mystate = {
          tokens: {
            result: [idTokenToRemove, 'idToken2', 'idToken3'],
          },
        };
        const expectedResult = ['idToken2', 'idToken3'];

        const reducerResult = reducer(mystate, {
          meta: { id: idTokenToRemove },
          type: actionTypes.DELETE_PAYMENT_TOKEN_SUCCESS,
        }).tokens;

        expect(reducerResult.result).toEqual(expectedResult);
        expect(reducerResult.isLoading).toBe(false);
      });
    });
  });

  describe('Instruments reducers', () => {
    beforeEach(() => {
      initialState = getInitialState(reducer()).instruments;
    });

    describe('ERRORS', () => {
      it.each([
        actionTypes.GET_INSTRUMENT_FAILURE,
        actionTypes.GET_INSTRUMENTS_FAILURE,
        actionTypes.POST_INSTRUMENT_FAILURE,
        actionTypes.PUT_INSTRUMENT_FAILURE,
        actionTypes.DELETE_INSTRUMENT_FAILURE,
      ])('should handle %s action type', actionType => {
        const expectedResult = 'foo';
        const reducerResult = reducer(undefined, {
          payload: { error: expectedResult },
          type: actionType,
        }).instruments;

        expect(reducerResult.error).toBe(expectedResult);
      });
    });

    describe('REQUESTS', () => {
      it.each([
        actionTypes.GET_INSTRUMENT_REQUEST,
        actionTypes.GET_INSTRUMENTS_REQUEST,
        actionTypes.POST_INSTRUMENT_REQUEST,
        actionTypes.PUT_INSTRUMENT_REQUEST,
        actionTypes.DELETE_INSTRUMENT_REQUEST,
      ])('should handle %s action type', actionType => {
        const reducerResult = reducer(undefined, {
          type: actionType,
        }).instruments;

        expect(reducerResult.isLoading).toBe(true);
        expect(reducerResult.error).toBe(initialState.error);
      });
    });

    describe('SUCCESS', () => {
      it.each([
        actionTypes.GET_INSTRUMENT_SUCCESS,
        actionTypes.GET_INSTRUMENTS_SUCCESS,
      ])('should handle %s action type', actionType => {
        const expectedResult = 'foo';
        const reducerResult = reducer(undefined, {
          payload: { result: expectedResult },
          type: actionType,
        }).instruments;

        expect(reducerResult.isLoading).toBe(false);
        expect(reducerResult.error).toBe(initialState.error);
        expect(reducerResult.result).toBe(expectedResult);
      });

      it.each([
        actionTypes.POST_INSTRUMENT_SUCCESS,
        actionTypes.PUT_INSTRUMENT_SUCCESS,
      ])('should handle %s action type', actionType => {
        const reducerResult = reducer(undefined, {
          type: actionType,
        }).instruments;

        expect(reducerResult.isLoading).toBe(false);
        expect(reducerResult.error).toBe(initialState.error);
      });

      it('should handle DELETE_INSTRUMENT_SUCCESS action type', () => {
        const instrumentToRemove = 'PayPalExp';
        const mystate = {
          instruments: {
            result: ['PayPalExp', 'AliPay'],
          },
        };
        const expectedResult = ['AliPay'];

        const reducerResult = reducer(mystate, {
          meta: { instrumentId: instrumentToRemove },
          type: actionTypes.DELETE_INSTRUMENT_SUCCESS,
        }).instruments;

        expect(reducerResult.result).toEqual(expectedResult);
        expect(reducerResult.isLoading).toBe(false);
        expect(reducerResult.error).toBe(initialState.error);
      });

      it('should handle RESET_INSTRUMENTS action type', () => {
        const mystate = {
          instruments: {
            isLoading: true,
            error: 'someError',
            result: ['instrument1', 'instrument2', 'instrument3'],
          },
        };

        const reducerResult = reducer(mystate, {
          type: actionTypes.RESET_INSTRUMENTS,
        }).instruments;

        expect(reducerResult).toEqual(initialState);
      });
    });
  });

  describe('Charges reducers', () => {
    beforeEach(() => {
      initialState = getInitialState(reducer()).charges;
    });

    it('should return the initial state', () => {
      const state = reducer().charges;

      expect(state).toEqual(initialState);
    });

    describe('ERRORS', () => {
      it.each([
        actionTypes.POST_CHARGES_FAILURE,
        actionTypes.GET_CHARGES_FAILURE,
      ])('should handle %s action type', actionType => {
        const mockError = 'mocked error';
        expect(
          reducer(undefined, {
            type: actionType,
            payload: { error: mockError },
          }).charges,
        ).toEqual({ error: mockError, isLoading: false });
      });
    });

    describe('REQUESTS', () => {
      it.each([
        actionTypes.POST_CHARGES_REQUEST,
        actionTypes.GET_CHARGES_REQUEST,
      ])('should handle %s action type', actionType => {
        expect(
          reducer(undefined, {
            type: actionType,
          }).charges,
        ).toEqual({
          error: initialState.error,
          isLoading: true,
        });
      });
    });
    describe('SUCCESS', () => {
      it.each([
        actionTypes.POST_CHARGES_SUCCESS,
        actionTypes.GET_CHARGES_SUCCESS,
      ])('should handle %s action type', actionType => {
        const mockResult = 'mocked result';
        const chargeId = '43b059df-898e-4407-8347-b075b645bf6c';
        const expectedResult = {
          ...mockResult,
          chargeId,
        };
        expect(
          reducer(undefined, {
            type: actionType,
            payload: mockResult,
            meta: { chargeId },
          }).charges,
        ).toEqual({
          error: initialState.error,
          isLoading: false,
          result: expectedResult,
        });
      });
    });

    it('should handle RESET_CHARGES action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.RESET_CHARGES,
        }).charges,
      ).toEqual(initialState);
    });
  });

  describe('entitiesMapper()', () => {
    describe('delete payment token', () => {
      const state = {
        paymentTokens: {
          1: { id: 1, data: 'data' },
          2: { id: 2, data: 'data' },
        },
      };

      const expectedResult = {
        paymentTokens: {
          2: { id: 2, data: 'data' },
        },
      };

      it('should handle DELETE_PAYMENT_TOKEN_SUCCESS action type', () => {
        expect(
          entitiesMapper[actionTypes.DELETE_PAYMENT_TOKEN_SUCCESS](state, {
            meta: { id: 1 },
            type: actionTypes.DELETE_PAYMENT_TOKEN_SUCCESS,
          }),
        ).toEqual(expectedResult);
      });
    });

    describe('post payments', () => {
      const orderId = '111';
      const result = { anotherProp: 123 };
      const state = {
        checkout: { data: 'data' },
        orderPayments: {
          [orderId]: { data: 'data' },
        },
      };

      const expectedResult = {
        ...state,
        orderPayments: {
          [orderId]: {
            ...state['orderPayments'][orderId],
            ...result,
          },
        },
      };

      it('should handle POST_PAYMENTS_SUCCESS action type', () => {
        expect(
          entitiesMapper[actionTypes.POST_PAYMENTS_SUCCESS](state, {
            meta: { id: orderId },
            payload: { entities: result },
            type: actionTypes.POST_PAYMENTS_SUCCESS,
          }),
        ).toEqual(expectedResult);
      });
    });

    describe('delete instrument', () => {
      const state = {
        instruments: {
          '9f9d327a-25cd-49de-83a8-533ab358f27b': {
            id: '9f9d327a-25cd-49de-83a8-533ab358f27b',
            data: 'data',
          },
          '9f9d327a-25cd-49de-83a8-533ab358f27c': {
            id: '9f9d327a-25cd-49de-83a8-533ab358f27c',
            data: 'data',
          },
        },
      };

      const expectedResult = {
        instruments: {
          '9f9d327a-25cd-49de-83a8-533ab358f27c': {
            id: '9f9d327a-25cd-49de-83a8-533ab358f27c',
            data: 'data',
          },
        },
      };

      it('should handle DELETE_INSTRUMENT_SUCCESS action type', () => {
        expect(
          entitiesMapper[actionTypes.DELETE_INSTRUMENT_SUCCESS](state, {
            meta: {
              instrumentId: '9f9d327a-25cd-49de-83a8-533ab358f27b',
            },
            type: actionTypes.DELETE_INSTRUMENT_SUCCESS,
          }),
        ).toEqual(expectedResult);
      });
    });

    describe('reset instruments', () => {
      const state = {
        instruments: {
          '9f9d327a-25cd-49de-83a8-533ab358f27b': {
            id: '9f9d327a-25cd-49de-83a8-533ab358f27b',
            data: 'data',
          },
          '9f9d327a-25cd-49de-83a8-533ab358f27c': {
            id: '9f9d327a-25cd-49de-83a8-533ab358f27c',
            data: 'data',
          },
        },
      };

      const expectedResult = {
        instruments: {},
      };

      it('should handle RESET_INSTRUMENTS action type', () => {
        expect(
          entitiesMapper[actionTypes.RESET_INSTRUMENTS](state, {
            type: actionTypes.DELETE_INSTRUMENT_SUCCESS,
          }),
        ).toEqual(expectedResult);
      });
    });
  });

  describe('Sub-areas selectors', () => {
    describe('Selectors for the existent sub-areas that *DO NOT* have a RESULT property', () => {
      const subAreaCurrentState = {
        error: null,
        isLoading: false,
      };

      // For the given subareas, the result of the selector should be the
      // current state.
      const subAreasExpectedStates = {
        orderPayments: { ...subAreaCurrentState },
        transaction: { ...subAreaCurrentState },
      };

      const subAreaNames = ['OrderPayments', 'Transaction'];

      reducerAssertions.assertSubAreasReducer(
        fromReducer,
        subAreaNames,
        subAreasExpectedStates,
        subAreaCurrentState,
      );
    });

    describe('Selectors for the existent sub-areas that *DO* have a RESULT property', () => {
      const subAreaCurrentState = {
        error: null,
        isLoading: false,
        result: 'some result',
      };

      // For the given subareas, the result of the selector should be the
      // current state.
      const subAreasExpectedStates = {
        tokens: { ...subAreaCurrentState },
        instruments: { ...subAreaCurrentState },
        giftCardBalance: { ...subAreaCurrentState },
        creditBalance: { ...subAreaCurrentState },
        intent: { ...subAreaCurrentState },
        charges: { ...subAreaCurrentState },
      };

      const subAreaNames = [
        'Tokens',
        'Instruments',
        'GiftCardBalance',
        'CreditBalance',
        'Intent',
        'Charges',
      ];

      reducerAssertions.assertSubAreasReducer(
        fromReducer,
        subAreaNames,
        subAreasExpectedStates,
        subAreaCurrentState,
      );
    });
  });
});
