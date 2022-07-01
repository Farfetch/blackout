import * as actionTypes from '../actionTypes';
import * as fromReducer from '../reducer';
import { LOGOUT_SUCCESS } from '../../users/authentication/actionTypes';
import { reducerAssertions } from '../../../tests/helpers';
import reducer, { entitiesMapper } from '../reducer';

let initialState;

describe('payments reducer', () => {
  beforeEach(() => {
    initialState = fromReducer.INITIAL_STATE;
  });

  describe('paymentIntentCharge reducers', () => {
    it('should return the initial state', () => {
      const state = fromReducer.INITIAL_STATE.paymentIntentCharge;

      expect(state).toEqual(initialState.paymentIntentCharge);
    });

    describe('ERRORS', () => {
      it.each([
        actionTypes.CREATE_PAYMENT_INTENT_CHARGE_FAILURE,
        actionTypes.FETCH_PAYMENT_INTENT_CHARGE_FAILURE,
      ])('should handle %s action type', actionType => {
        const mockError = 'mocked error';
        expect(
          reducer(undefined, {
            type: actionType,
            payload: { error: mockError },
          }).paymentIntentCharge,
        ).toEqual({ error: mockError, isLoading: false, result: null });
      });
    });

    describe('REQUESTS', () => {
      it.each([
        actionTypes.CREATE_PAYMENT_INTENT_CHARGE_REQUEST,
        actionTypes.FETCH_PAYMENT_INTENT_CHARGE_REQUEST,
      ])('should handle %s action type', actionType => {
        expect(
          reducer(undefined, {
            type: actionType,
          }).paymentIntentCharge,
        ).toEqual({
          error: initialState.paymentIntentCharge.error,
          isLoading: true,
          result: null,
        });
      });
    });

    describe('SUCCESS', () => {
      it.each([
        actionTypes.CREATE_PAYMENT_INTENT_CHARGE_SUCCESS,
        actionTypes.FETCH_PAYMENT_INTENT_CHARGE_SUCCESS,
      ])('should handle %s action type', actionType => {
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
          }).paymentIntentCharge,
        ).toEqual({
          error: initialState.paymentIntentCharge.error,
          isLoading: false,
          result: expectedResult,
        });
      });
    });

    it('should handle RESET_PAYMENT_INTENT_CHARGE_STATE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.RESET_PAYMENT_INTENT_CHARGE_STATE,
        }).paymentIntentCharge,
      ).toEqual(initialState.paymentIntentCharge);
    });

    describe('LOGOUT_SUCCESS', () => {
      it('should handle LOGOUT_SUCCESS action type', () => {
        const reducerResult = reducer(undefined, {
          type: LOGOUT_SUCCESS,
        }).paymentIntentCharge;

        expect(reducerResult.error).toBe(null);
        expect(reducerResult.result).toBe(null);
        expect(reducerResult.isLoading).toBe(false);
      });
    });
  });

  describe('paymentInstruments reducers', () => {
    describe('ERRORS', () => {
      it.each([
        actionTypes.FETCH_PAYMENT_INTENT_INSTRUMENT_FAILURE,
        actionTypes.FETCH_PAYMENT_INTENT_INSTRUMENT_FAILURE,
        actionTypes.CREATE_PAYMENT_INTENT_INSTRUMENT_FAILURE,
        actionTypes.UPDATE_PAYMENT_INTENT_INSTRUMENT_FAILURE,
        actionTypes.REMOVE_PAYMENT_INTENT_INSTRUMENT_FAILURE,
      ])('should handle %s action type', actionType => {
        const expectedResult = 'foo';
        const reducerResult = reducer(undefined, {
          payload: { error: expectedResult },
          type: actionType,
        }).paymentInstruments;

        expect(reducerResult.error).toBe(expectedResult);
      });
    });

    describe('REQUESTS', () => {
      it.each([
        actionTypes.FETCH_PAYMENT_INTENT_INSTRUMENT_REQUEST,
        actionTypes.FETCH_PAYMENT_INTENT_INSTRUMENTS_REQUEST,
        actionTypes.CREATE_PAYMENT_INTENT_INSTRUMENT_REQUEST,
        actionTypes.UPDATE_PAYMENT_INTENT_INSTRUMENT_REQUEST,
        actionTypes.REMOVE_PAYMENT_INTENT_INSTRUMENT_REQUEST,
      ])('should handle %s action type', actionType => {
        const reducerResult = reducer(undefined, {
          type: actionType,
        }).paymentInstruments;

        expect(reducerResult.isLoading).toBe(true);
        expect(reducerResult.error).toBe(initialState.paymentInstruments.error);
      });
    });

    describe('SUCCESS', () => {
      it.each([
        actionTypes.FETCH_PAYMENT_INTENT_INSTRUMENT_SUCCESS,
        actionTypes.FETCH_PAYMENT_INTENT_INSTRUMENTS_SUCCESS,
      ])('should handle %s action type', actionType => {
        const expectedResult = 'foo';
        const reducerResult = reducer(undefined, {
          payload: { result: expectedResult },
          type: actionType,
        }).paymentInstruments;

        expect(reducerResult.isLoading).toBe(false);
        expect(reducerResult.error).toBe(initialState.paymentInstruments.error);
        expect(reducerResult.result).toBe(expectedResult);
      });

      it.each([
        actionTypes.CREATE_PAYMENT_INTENT_INSTRUMENT_SUCCESS,
        actionTypes.UPDATE_PAYMENT_INTENT_INSTRUMENT_SUCCESS,
      ])('should handle %s action type', actionType => {
        const reducerResult = reducer(undefined, {
          type: actionType,
        }).paymentInstruments;

        expect(reducerResult.isLoading).toBe(false);
        expect(reducerResult.error).toBe(initialState.paymentInstruments.error);
      });

      it('should handle REMOVE_PAYMENT_INTENT_INSTRUMENT_SUCCESS action type', () => {
        const instrumentToRemove = 'PayPalExp';
        const mystate = {
          ...initialState,
          paymentInstruments: {
            result: ['PayPalExp', 'AliPay'],
          },
        };
        const expectedResult = ['AliPay'];

        const reducerResult = reducer(mystate, {
          meta: { instrumentId: instrumentToRemove },
          type: actionTypes.REMOVE_PAYMENT_INTENT_INSTRUMENT_SUCCESS,
        }).paymentInstruments;

        expect(reducerResult.result).toEqual(expectedResult);
        expect(reducerResult.isLoading).toBe(false);
        expect(reducerResult.error).toBe(initialState.paymentInstruments.error);
      });

      it('should handle RESET_PAYMENT_INSTRUMENTS_STATE action type', () => {
        const mystate = {
          ...initialState,
          paymentInstruments: {
            isLoading: true,
            error: 'someError',
            result: ['instrument1', 'instrument2', 'instrument3'],
          },
        };

        const reducerResult = reducer(mystate, {
          type: actionTypes.RESET_PAYMENT_INSTRUMENTS_STATE,
        }).paymentInstruments;

        expect(reducerResult).toEqual(initialState.paymentInstruments);
      });
    });

    describe('LOGOUT_SUCCESS', () => {
      it('should handle LOGOUT_SUCCESS action type', () => {
        const reducerResult = reducer(undefined, {
          type: LOGOUT_SUCCESS,
        }).paymentInstruments;

        expect(reducerResult.error).toBe(null);
        expect(reducerResult.result).toBe(null);
        expect(reducerResult.isLoading).toBe(false);
      });
    });
  });

  describe('paymentTokens reducers', () => {
    describe('ERRORS', () => {
      it.each([
        actionTypes.FETCH_PAYMENT_TOKENS_FAILURE,
        actionTypes.REMOVE_PAYMENT_TOKEN_FAILURE,
      ])('should handle %s action type', actionType => {
        const expectedResult = 'foo';
        const reducerResult = reducer(undefined, {
          payload: { error: expectedResult },
          type: actionType,
        }).paymentTokens;

        expect(reducerResult.error).toBe(expectedResult);
      });
    });

    describe('REQUESTS', () => {
      it.each([
        actionTypes.FETCH_PAYMENT_TOKENS_REQUEST,
        actionTypes.REMOVE_PAYMENT_TOKEN_REQUEST,
      ])('should handle %s action type', actionType => {
        const reducerResult = reducer(undefined, {
          type: actionType,
        }).paymentTokens;

        expect(reducerResult.isLoading).toBe(true);
        expect(reducerResult.error).toBe(initialState.paymentTokens.error);
      });
    });

    describe('SUCCESS', () => {
      it('should handle FETCH_PAYMENT_TOKENS_SUCCESS action type', () => {
        const expectedResult = 'foo';
        const reducerResult = reducer(undefined, {
          payload: { result: expectedResult },
          type: actionTypes.FETCH_PAYMENT_TOKENS_SUCCESS,
        }).paymentTokens;

        expect(reducerResult.result).toBe(expectedResult);
        expect(reducerResult.isLoading).toBe(false);
      });

      it('should handle REMOVE_PAYMENT_TOKEN_SUCCESS action type', () => {
        const idTokenToRemove = 'idToken1';
        const mystate = {
          ...initialState,
          paymentTokens: {
            result: [idTokenToRemove, 'idToken2', 'idToken3'],
          },
        };
        const expectedResult = ['idToken2', 'idToken3'];

        const reducerResult = reducer(mystate, {
          meta: { id: idTokenToRemove },
          type: actionTypes.REMOVE_PAYMENT_TOKEN_SUCCESS,
        }).paymentTokens;

        expect(reducerResult.result).toEqual(expectedResult);
        expect(reducerResult.isLoading).toBe(false);
      });
    });

    describe('LOGOUT_SUCCESS', () => {
      it('should handle LOGOUT_SUCCESS action type', () => {
        const reducerResult = reducer(undefined, {
          type: LOGOUT_SUCCESS,
        }).paymentTokens;

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

    describe('delete payment intent instrument', () => {
      const state = {
        paymentInstruments: {
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
        paymentInstruments: {
          '9f9d327a-25cd-49de-83a8-533ab358f27c': {
            id: '9f9d327a-25cd-49de-83a8-533ab358f27c',
            data: 'data',
          },
        },
      };

      it('should handle REMOVE_PAYMENT_INTENT_INSTRUMENT_SUCCESS action type', () => {
        expect(
          entitiesMapper[actionTypes.REMOVE_PAYMENT_INTENT_INSTRUMENT_SUCCESS](
            state,
            {
              meta: {
                instrumentId: '9f9d327a-25cd-49de-83a8-533ab358f27b',
              },
              type: actionTypes.REMOVE_PAYMENT_INTENT_INSTRUMENT_SUCCESS,
            },
          ),
        ).toEqual(expectedResult);
      });
    });

    describe('reset payment intent instruments', () => {
      const state = {
        paymentInstruments: {
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
        paymentInstruments: {},
      };

      it('should handle RESET_PAYMENT_INSTRUMENTS_STATE action type', () => {
        expect(
          entitiesMapper[actionTypes.RESET_PAYMENT_INSTRUMENTS_STATE](state),
        ).toEqual(expectedResult);
      });
    });

    describe('logout', () => {
      it('should handle LOGOUT_SUCCESS action type', () => {
        const state = {
          paymentInstruments: {
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
          paymentInstruments: {},
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
        paymentIntentCharge: { ...subAreaCurrentState },
        userCreditBalance: { ...subAreaCurrentState },
        giftCardBalance: { ...subAreaCurrentState },
        paymentInstruments: { ...subAreaCurrentState },
        paymentIntent: { ...subAreaCurrentState },
        paymentMethods: { ...subAreaCurrentState },
        paymentTokens: { ...subAreaCurrentState },
      };

      const subAreaNames = [
        'PaymentIntentCharge',
        'UserCreditBalance',
        'GiftCardBalance',
        'PaymentInstruments',
        'PaymentIntent',
        'PaymentMethods',
        'PaymentTokens',
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
