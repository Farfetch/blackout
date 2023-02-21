import * as actionTypes from '../actionTypes';
import * as fromReducer from '../reducer';
import {
  FETCH_USER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
} from '../../users/authentication/actionTypes';
import {
  instrumentId,
  mockInitialState,
  mockInstrumentData,
  mockPaymentTokensResponse,
  paymentTokenId,
  paymentTokenId2,
} from 'tests/__fixtures__/payments';
import { reducerAssertions } from '../../../tests/helpers';
import { toBlackoutError } from '@farfetch/blackout-client';
import omit from 'lodash/omit';
import reducer, { entitiesMapper } from '../reducer';
import type { PaymentsState } from '../types';
import type { PaymentTokenEntity } from '../../entities';

let initialState: PaymentsState;

describe('payments reducer', () => {
  beforeEach(() => {
    initialState = fromReducer.INITIAL_STATE;
  });

  describe('reset handling', () => {
    it.each([
      actionTypes.RESET_PAYMENTS,
      LOGOUT_SUCCESS,
      LOGIN_SUCCESS,
      FETCH_USER_SUCCESS,
      REGISTER_SUCCESS,
    ])('should return initial state on %s action', actionType => {
      expect(
        reducer(
          {
            paymentIntentCharge: {
              error: null,
              isLoading: true,
              result: null,
            },
            userCreditBalance: {
              error: null,
              isLoading: true,
              result: null,
            },
            giftCardBalance: {
              error: null,
              isLoading: true,
              result: null,
            },
            paymentIntentInstruments: {
              error: null,
              isLoading: false,
              result: ['PayPalExp', 'AliPay'],
            },
            paymentIntent: {
              error: null,
              isLoading: false,
              result: null,
            },
            paymentMethods: {
              error: null,
              isLoading: false,
              result: null,
            },
            paymentTokens: {
              error: null,
              isLoading: false,
              result: null,
            },
          },
          {
            type: actionType,
            payload: {},
          },
        ),
      ).toMatchObject(initialState);
    });
  });

  describe('paymentIntentCharge reducer', () => {
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
  });

  describe('paymentIntentInstruments reducer', () => {
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
        }).paymentIntentInstruments;

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
        }).paymentIntentInstruments;

        expect(reducerResult.isLoading).toBe(true);
        expect(reducerResult.error).toBe(
          initialState.paymentIntentInstruments.error,
        );
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
        }).paymentIntentInstruments;

        expect(reducerResult.isLoading).toBe(false);
        expect(reducerResult.error).toBe(
          initialState.paymentIntentInstruments.error,
        );
        expect(reducerResult.result).toBe(expectedResult);
      });

      it.each([
        actionTypes.CREATE_PAYMENT_INTENT_INSTRUMENT_SUCCESS,
        actionTypes.UPDATE_PAYMENT_INTENT_INSTRUMENT_SUCCESS,
      ])('should handle %s action type', actionType => {
        const reducerResult = reducer(undefined, {
          type: actionType,
        }).paymentIntentInstruments;

        expect(reducerResult.isLoading).toBe(false);
        expect(reducerResult.error).toBe(
          initialState.paymentIntentInstruments.error,
        );
      });

      it('should handle REMOVE_PAYMENT_INTENT_INSTRUMENT_SUCCESS action type', () => {
        const instrumentToRemove = 'PayPalExp';
        const mystate = {
          ...initialState,
          paymentIntentInstruments: {
            result: ['PayPalExp', 'AliPay'],
          },
        } as PaymentsState;
        const expectedResult = ['AliPay'];

        const reducerResult = reducer(mystate, {
          meta: { instrumentId: instrumentToRemove },
          type: actionTypes.REMOVE_PAYMENT_INTENT_INSTRUMENT_SUCCESS,
        }).paymentIntentInstruments;

        expect(reducerResult.result).toEqual(expectedResult);
        expect(reducerResult.isLoading).toBe(false);
        expect(reducerResult.error).toBe(
          initialState.paymentIntentInstruments.error,
        );
      });

      it('should handle RESET_PAYMENT_INTENT_INSTRUMENTS_STATE action type', () => {
        const mystate = {
          ...initialState,
          paymentIntentInstruments: {
            isLoading: true,
            error: toBlackoutError(new Error('some error')),
            result: ['instrument1', 'instrument2', 'instrument3'],
          },
        };

        const reducerResult = reducer(mystate, {
          type: actionTypes.RESET_PAYMENT_INTENT_INSTRUMENTS_STATE,
        }).paymentIntentInstruments;

        expect(reducerResult).toEqual(initialState.paymentIntentInstruments);
      });
    });
  });

  describe('paymentTokens reducer', () => {
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
        } as PaymentsState;
        const expectedResult = ['idToken2', 'idToken3'];

        const reducerResult = reducer(mystate, {
          meta: { id: idTokenToRemove },
          type: actionTypes.REMOVE_PAYMENT_TOKEN_SUCCESS,
        }).paymentTokens;

        expect(reducerResult.result).toEqual(expectedResult);
        expect(reducerResult.isLoading).toBe(false);
      });
    });
  });

  describe('giftCardBalance reducer', () => {
    it('should return the initial state', () => {
      const state = fromReducer.INITIAL_STATE.giftCardBalance;

      expect(state).toEqual(initialState.giftCardBalance);
    });

    describe('ERRORS', () => {
      it.each([actionTypes.FETCH_GIFT_CARD_BALANCE_FAILURE])(
        'should handle %s action type',
        actionType => {
          const mockError = 'mocked error';

          expect(
            reducer(undefined, {
              type: actionType,
              payload: { error: mockError },
            }).giftCardBalance,
          ).toEqual({ error: mockError, isLoading: false });
        },
      );
    });

    describe('REQUESTS', () => {
      it.each([actionTypes.FETCH_GIFT_CARD_BALANCE_REQUEST])(
        'should handle %s action type',
        actionType => {
          expect(
            reducer(undefined, {
              type: actionType,
            }).giftCardBalance,
          ).toEqual({
            error: initialState.giftCardBalance.error,
            isLoading: true,
          });
        },
      );
    });

    describe('SUCCESS', () => {
      it.each([actionTypes.FETCH_GIFT_CARD_BALANCE_SUCCESS])(
        'should handle %s action type',
        actionType => {
          const mockResult = { foo: 'mocked result' };
          const expectedResult = mockResult;

          expect(
            reducer(undefined, {
              type: actionType,
              payload: mockResult,
            }).giftCardBalance,
          ).toEqual({
            error: initialState.giftCardBalance.error,
            isLoading: false,
            result: expectedResult,
          });
        },
      );
    });

    it('should handle RESET_GIFT_CARD_BALANCE_STATE action type', () => {
      expect(
        reducer(
          {
            ...mockInitialState.payments,
            giftCardBalance: {
              isLoading: true,
              error: toBlackoutError(new Error('dummy error')),
              result: null,
            },
          },
          {
            type: actionTypes.RESET_GIFT_CARD_BALANCE_STATE,
          },
        ).giftCardBalance,
      ).toEqual(initialState.giftCardBalance);
    });
  });

  describe('userCreditBalance reducer', () => {
    it('should return the initial state', () => {
      const state = fromReducer.INITIAL_STATE.userCreditBalance;

      expect(state).toEqual(initialState.userCreditBalance);
    });

    describe('ERRORS', () => {
      it.each([actionTypes.FETCH_USER_CREDIT_BALANCE_FAILURE])(
        'should handle %s action type',
        actionType => {
          const mockError = 'mocked error';

          expect(
            reducer(undefined, {
              type: actionType,
              payload: { error: mockError },
            }).userCreditBalance,
          ).toEqual({ error: mockError, isLoading: false });
        },
      );
    });

    describe('REQUESTS', () => {
      it.each([actionTypes.FETCH_USER_CREDIT_BALANCE_REQUEST])(
        'should handle %s action type',
        actionType => {
          expect(
            reducer(undefined, {
              type: actionType,
            }).userCreditBalance,
          ).toEqual({
            error: initialState.userCreditBalance.error,
            isLoading: true,
          });
        },
      );
    });

    describe('SUCCESS', () => {
      it.each([actionTypes.FETCH_USER_CREDIT_BALANCE_SUCCESS])(
        'should handle %s action type',
        actionType => {
          const mockResult = { foo: 'mocked result' };
          const expectedResult = mockResult;

          expect(
            reducer(undefined, {
              type: actionType,
              payload: mockResult,
            }).userCreditBalance,
          ).toEqual({
            error: initialState.userCreditBalance.error,
            isLoading: false,
            result: expectedResult,
          });
        },
      );
    });

    it('should handle RESET_USER_CREDIT_BALANCE_STATE action type', () => {
      expect(
        reducer(
          {
            ...mockInitialState.payments,
            userCreditBalance: {
              isLoading: true,
              error: toBlackoutError(new Error('dummy error')),
              result: null,
            },
          },
          {
            type: actionTypes.RESET_USER_CREDIT_BALANCE_STATE,
          },
        ).userCreditBalance,
      ).toEqual(initialState.userCreditBalance);
    });
  });

  describe('paymentIntent reducer', () => {
    it('should return the initial state', () => {
      const state = fromReducer.INITIAL_STATE.paymentIntent;

      expect(state).toEqual(initialState.paymentIntent);
    });

    describe('ERRORS', () => {
      it.each([actionTypes.FETCH_PAYMENT_INTENT_FAILURE])(
        'should handle %s action type',
        actionType => {
          const mockError = 'mocked error';

          expect(
            reducer(undefined, {
              type: actionType,
              payload: { error: mockError },
            }).paymentIntent,
          ).toEqual({ error: mockError, isLoading: false });
        },
      );
    });

    describe('REQUESTS', () => {
      it.each([actionTypes.FETCH_PAYMENT_INTENT_REQUEST])(
        'should handle %s action type',
        actionType => {
          expect(
            reducer(undefined, {
              type: actionType,
            }).paymentIntent,
          ).toEqual({
            error: initialState.paymentIntent.error,
            isLoading: true,
          });
        },
      );
    });

    describe('SUCCESS', () => {
      it.each([actionTypes.FETCH_PAYMENT_INTENT_SUCCESS])(
        'should handle %s action type',
        actionType => {
          const mockResult = { foo: 'mocked result' };
          const expectedResult = mockResult;

          expect(
            reducer(undefined, {
              type: actionType,
              payload: mockResult,
            }).paymentIntent,
          ).toEqual({
            error: initialState.paymentIntent.error,
            isLoading: false,
            result: expectedResult,
          });
        },
      );
    });

    it('should handle RESET_PAYMENT_INTENT_STATE action type', () => {
      expect(
        reducer(
          {
            ...mockInitialState.payments,
            paymentIntent: {
              isLoading: true,
              error: toBlackoutError(new Error('dummy error')),
              result: null,
            },
          },
          {
            type: actionTypes.RESET_PAYMENT_INTENT_STATE,
          },
        ).paymentIntent,
      ).toEqual(initialState.paymentIntent);
    });
  });

  describe('entitiesMapper()', () => {
    describe('delete payment token', () => {
      const state = {
        ...mockInitialState.entities,
        paymentTokens: {
          [paymentTokenId]: mockPaymentTokensResponse[0] as PaymentTokenEntity,
          [paymentTokenId2]: mockPaymentTokensResponse[1] as PaymentTokenEntity,
        },
      };

      const expectedResult = {
        ...mockInitialState.entities,
        paymentTokens: {
          [paymentTokenId]: mockPaymentTokensResponse[0],
        },
      };

      it('should handle REMOVE_PAYMENT_TOKEN_SUCCESS action type', () => {
        expect(
          entitiesMapper[actionTypes.REMOVE_PAYMENT_TOKEN_SUCCESS](state, {
            meta: { id: paymentTokenId2 },
            type: actionTypes.REMOVE_PAYMENT_TOKEN_SUCCESS,
          }),
        ).toEqual(expectedResult);
      });
    });

    describe('delete payment intent instrument', () => {
      const instrumentId2 = 'mock-instrument-2';

      const state = {
        ...mockInitialState.entities,
        paymentInstruments: {
          [instrumentId]: mockInstrumentData,
          [instrumentId2]: mockInstrumentData,
        },
      };

      const expectedResult = {
        ...mockInitialState.entities,
        paymentInstruments: {
          [instrumentId]: mockInstrumentData,
        },
      };

      it('should handle REMOVE_PAYMENT_INTENT_INSTRUMENT_SUCCESS action type', () => {
        expect(
          entitiesMapper[actionTypes.REMOVE_PAYMENT_INTENT_INSTRUMENT_SUCCESS](
            state,
            {
              meta: {
                instrumentId: instrumentId2,
              },
              type: actionTypes.REMOVE_PAYMENT_INTENT_INSTRUMENT_SUCCESS,
            },
          ),
        ).toEqual(expectedResult);
      });
    });

    describe('reset payment intent instruments', () => {
      const state = {
        ...mockInitialState.entities,
        paymentInstruments: {
          [instrumentId]: mockInstrumentData,
        },
      };

      const expectedResult = {
        ...mockInitialState.entities,
        paymentInstruments: undefined,
      };

      it('should handle RESET_PAYMENT_INTENT_INSTRUMENTS_STATE action type', () => {
        expect(
          entitiesMapper[actionTypes.RESET_PAYMENT_INTENT_INSTRUMENTS_STATE](
            state,
          ),
        ).toEqual(expectedResult);
      });
    });

    describe('reset handling', () => {
      it.each([
        actionTypes.RESET_PAYMENTS,
        LOGOUT_SUCCESS,
        LOGIN_SUCCESS,
        FETCH_USER_SUCCESS,
        REGISTER_SUCCESS,
      ])('should return initial state on %s action', actionType => {
        const state = {
          ...mockInitialState.entities,
          paymentInstruments: {
            [instrumentId]: mockInstrumentData,
          },
          paymentTokens: {
            [paymentTokenId]:
              mockPaymentTokensResponse[0] as PaymentTokenEntity,
            [paymentTokenId2]:
              mockPaymentTokensResponse[1] as PaymentTokenEntity,
          },
          dummy: {
            ABCDEF: { id: 'ABCDEF' },
          },
        };

        const expectedResult = {
          ...omit(state, ['paymentInstruments', 'paymentTokens']),
        };

        expect(
          entitiesMapper[actionType as keyof typeof entitiesMapper](state, {
            type: actionType,
          }),
        ).toEqual(expectedResult);
      });
    });
  });

  describe('Sub-areas selectors', () => {
    describe('Selectors for the existent sub-areas that *DO* have a RESULT property', () => {
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
        paymentIntentInstruments: { ...subAreaCurrentState },
        paymentIntent: { ...subAreaCurrentState },
        paymentMethods: { ...subAreaCurrentState },
        paymentTokens: { ...subAreaCurrentState },
      };

      const subAreaNames = [
        'PaymentIntentCharge',
        'UserCreditBalance',
        'GiftCardBalance',
        'PaymentIntentInstruments',
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
