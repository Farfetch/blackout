import * as fromReducer from '../reducer';
import { LOGOUT_SUCCESS } from '@farfetch/blackout-redux/authentication/actionTypes';
import { reducerAssertions } from '../../../tests/helpers';
import reducer, { actionTypes, entitiesMapper } from '..';

let initialState;

describe('payments reducer', () => {
  beforeEach(() => {
    initialState = fromReducer.INITIAL_STATE;
  });

  describe('Charges reducers', () => {
    it('should return the initial state', () => {
      const state = fromReducer.INITIAL_STATE.charges;

      expect(state).toEqual(initialState.charges);
    });

    describe('ERRORS', () => {
      it.each([actionTypes.CHARGE_FAILURE, actionTypes.FETCH_CHARGES_FAILURE])(
        'should handle %s action type',
        actionType => {
          const mockError = 'mocked error';
          expect(
            reducer(undefined, {
              type: actionType,
              payload: { error: mockError },
            }).charges,
          ).toEqual({ error: mockError, isLoading: false, result: null });
        },
      );
    });

    describe('REQUESTS', () => {
      it.each([actionTypes.CHARGE_REQUEST, actionTypes.FETCH_CHARGES_REQUEST])(
        'should handle %s action type',
        actionType => {
          expect(
            reducer(undefined, {
              type: actionType,
            }).charges,
          ).toEqual({
            error: initialState.charges.error,
            isLoading: true,
            result: null,
          });
        },
      );
    });

    describe('SUCCESS', () => {
      it.each([actionTypes.CHARGE_SUCCESS, actionTypes.FETCH_CHARGES_SUCCESS])(
        'should handle %s action type',
        actionType => {
          const mockResult = { foo: 'mocked result' };
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
            error: initialState.charges.error,
            isLoading: false,
            result: expectedResult,
          });
        },
      );
    });

    it('should handle RESET_CHARGES_STATE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.RESET_CHARGES_STATE,
        }).charges,
      ).toEqual(initialState.charges);
    });

    describe('LOGOUT_SUCCESS', () => {
      it('should handle LOGOUT_SUCCESS action type', () => {
        const reducerResult = reducer(undefined, {
          type: LOGOUT_SUCCESS,
        }).charges;

        expect(reducerResult.error).toBe(null);
        expect(reducerResult.result).toBe(null);
        expect(reducerResult.isLoading).toBe(false);
      });
    });
  });

  describe('Instruments reducers', () => {
    describe('ERRORS', () => {
      it.each([
        actionTypes.FETCH_INSTRUMENT_FAILURE,
        actionTypes.FETCH_INSTRUMENTS_FAILURE,
        actionTypes.CREATE_INSTRUMENT_FAILURE,
        actionTypes.UPDATE_INSTRUMENT_FAILURE,
        actionTypes.REMOVE_INSTRUMENT_FAILURE,
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
        actionTypes.FETCH_INSTRUMENT_REQUEST,
        actionTypes.FETCH_INSTRUMENTS_REQUEST,
        actionTypes.CREATE_INSTRUMENT_REQUEST,
        actionTypes.UPDATE_INSTRUMENT_REQUEST,
        actionTypes.REMOVE_INSTRUMENT_REQUEST,
      ])('should handle %s action type', actionType => {
        const reducerResult = reducer(undefined, {
          type: actionType,
        }).instruments;

        expect(reducerResult.isLoading).toBe(true);
        expect(reducerResult.error).toBe(initialState.instruments.error);
      });
    });

    describe('SUCCESS', () => {
      it.each([
        actionTypes.FETCH_INSTRUMENT_SUCCESS,
        actionTypes.FETCH_INSTRUMENTS_SUCCESS,
      ])('should handle %s action type', actionType => {
        const expectedResult = 'foo';
        const reducerResult = reducer(undefined, {
          payload: { result: expectedResult },
          type: actionType,
        }).instruments;

        expect(reducerResult.isLoading).toBe(false);
        expect(reducerResult.error).toBe(initialState.instruments.error);
        expect(reducerResult.result).toBe(expectedResult);
      });

      it.each([
        actionTypes.CREATE_INSTRUMENT_SUCCESS,
        actionTypes.UPDATE_INSTRUMENT_SUCCESS,
      ])('should handle %s action type', actionType => {
        const reducerResult = reducer(undefined, {
          type: actionType,
        }).instruments;

        expect(reducerResult.isLoading).toBe(false);
        expect(reducerResult.error).toBe(initialState.instruments.error);
      });

      it('should handle REMOVE_INSTRUMENT_SUCCESS action type', () => {
        const instrumentToRemove = 'PayPalExp';
        const mystate = {
          ...initialState,
          instruments: {
            result: ['PayPalExp', 'AliPay'],
          },
        };
        const expectedResult = ['AliPay'];

        const reducerResult = reducer(mystate, {
          meta: { instrumentId: instrumentToRemove },
          type: actionTypes.REMOVE_INSTRUMENT_SUCCESS,
        }).instruments;

        expect(reducerResult.result).toEqual(expectedResult);
        expect(reducerResult.isLoading).toBe(false);
        expect(reducerResult.error).toBe(initialState.instruments.error);
      });

      it('should handle RESET_INSTRUMENTS_STATE action type', () => {
        const mystate = {
          ...initialState,
          instruments: {
            isLoading: true,
            error: 'someError',
            result: ['instrument1', 'instrument2', 'instrument3'],
          },
        };

        const reducerResult = reducer(mystate, {
          type: actionTypes.RESET_INSTRUMENTS_STATE,
        }).instruments;

        expect(reducerResult).toEqual(initialState.instruments);
      });
    });

    describe('LOGOUT_SUCCESS', () => {
      it('should handle LOGOUT_SUCCESS action type', () => {
        const reducerResult = reducer(undefined, {
          type: LOGOUT_SUCCESS,
        }).instruments;

        expect(reducerResult.error).toBe(null);
        expect(reducerResult.result).toBe(null);
        expect(reducerResult.isLoading).toBe(false);
      });
    });
  });

  describe('Payment Tokens reducers', () => {
    describe('ERRORS', () => {
      it.each([
        actionTypes.FETCH_PAYMENT_TOKENS_FAILURE,
        actionTypes.REMOVE_PAYMENT_TOKEN_FAILURE,
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
        actionTypes.FETCH_PAYMENT_TOKENS_REQUEST,
        actionTypes.REMOVE_PAYMENT_TOKEN_REQUEST,
      ])('should handle %s action type', actionType => {
        const reducerResult = reducer(undefined, { type: actionType }).tokens;

        expect(reducerResult.isLoading).toBe(true);
        expect(reducerResult.error).toBe(initialState.tokens.error);
      });
    });

    describe('SUCCESS', () => {
      it('should handle FETCH_PAYMENT_TOKENS_SUCCESS action type', () => {
        const expectedResult = 'foo';
        const reducerResult = reducer(undefined, {
          payload: { result: expectedResult },
          type: actionTypes.FETCH_PAYMENT_TOKENS_SUCCESS,
        }).tokens;

        expect(reducerResult.result).toBe(expectedResult);
        expect(reducerResult.isLoading).toBe(false);
      });

      it('should handle REMOVE_PAYMENT_TOKEN_SUCCESS action type', () => {
        const idTokenToRemove = 'idToken1';
        const mystate = {
          ...initialState,
          tokens: {
            result: [idTokenToRemove, 'idToken2', 'idToken3'],
          },
        };
        const expectedResult = ['idToken2', 'idToken3'];

        const reducerResult = reducer(mystate, {
          meta: { id: idTokenToRemove },
          type: actionTypes.REMOVE_PAYMENT_TOKEN_SUCCESS,
        }).tokens;

        expect(reducerResult.result).toEqual(expectedResult);
        expect(reducerResult.isLoading).toBe(false);
      });
    });

    describe('LOGOUT_SUCCESS', () => {
      it('should handle LOGOUT_SUCCESS action type', () => {
        const reducerResult = reducer(undefined, {
          type: LOGOUT_SUCCESS,
        }).tokens;

        expect(reducerResult.error).toBe(null);
        expect(reducerResult.result).toBe(null);
        expect(reducerResult.isLoading).toBe(false);
      });
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

      it('should handle REMOVE_PAYMENT_TOKEN_SUCCESS action type', () => {
        expect(
          entitiesMapper[actionTypes.REMOVE_PAYMENT_TOKEN_SUCCESS](state, {
            meta: { id: 1 },
            type: actionTypes.REMOVE_PAYMENT_TOKEN_SUCCESS,
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

      it('should handle REMOVE_INSTRUMENT_SUCCESS action type', () => {
        expect(
          entitiesMapper[actionTypes.REMOVE_INSTRUMENT_SUCCESS](state, {
            meta: {
              instrumentId: '9f9d327a-25cd-49de-83a8-533ab358f27b',
            },
            type: actionTypes.REMOVE_INSTRUMENT_SUCCESS,
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

      it('should handle RESET_INSTRUMENTS_STATE action type', () => {
        expect(
          entitiesMapper[actionTypes.RESET_INSTRUMENTS_STATE](state),
        ).toEqual(expectedResult);
      });
    });

    describe('logout', () => {
      it('should handle LOGOUT_SUCCESS action type', () => {
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
          paymentTokens: {},
          checkoutOrders: {},
        };

        expect(entitiesMapper[LOGOUT_SUCCESS](state)).toEqual(expectedResult);
      });
    });
  });

  describe('Sub-areas reducers', () => {
    describe('Reducers for the existent sub-areas that *DO* have a RESULT property', () => {
      const subAreaCurrentState = {
        error: null,
        isLoading: false,
        result: 'some result',
      };

      // For the given subareas, the result of the selector should be the
      // current state.
      const subAreasExpectedStates = {
        charges: { ...subAreaCurrentState },
        creditBalance: { ...subAreaCurrentState },
        giftCardBalance: { ...subAreaCurrentState },
        instruments: { ...subAreaCurrentState },
        intent: { ...subAreaCurrentState },
        paymentMethods: { ...subAreaCurrentState },
        tokens: { ...subAreaCurrentState },
      };

      const subAreaNames = [
        'Charges',
        'CreditBalance',
        'GiftCardBalance',
        'Instruments',
        'Intent',
        'PaymentMethods',
        'Tokens',
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
