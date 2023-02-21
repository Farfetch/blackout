import * as actionTypes from './actionTypes';
import { type AnyAction, combineReducers, type Reducer } from 'redux';
import { createReducerWithResult } from '../helpers/reducerFactory';
import {
  FETCH_USER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
} from '../users/authentication/actionTypes';
import get from 'lodash/get';
import omit from 'lodash/omit';
import type * as T from './types';
import type {
  PaymentInstrument,
  PaymentToken,
} from '@farfetch/blackout-client';
import type { PaymentsState } from './types';
import type { StoreState } from '../types';

export const INITIAL_STATE: T.PaymentsState = {
  paymentIntentCharge: {
    error: null,
    isLoading: false,
    result: null,
  },
  userCreditBalance: {
    error: null,
    isLoading: false,
    result: null,
  },
  giftCardBalance: {
    error: null,
    isLoading: false,
    result: null,
  },
  paymentIntentInstruments: {
    error: null,
    isLoading: false,
    result: null,
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
};

const paymentIntentCharge = (
  state = INITIAL_STATE.paymentIntentCharge,
  action: AnyAction,
): PaymentsState['paymentIntentCharge'] => {
  switch (action.type) {
    case actionTypes.CREATE_PAYMENT_INTENT_CHARGE_REQUEST:
    case actionTypes.FETCH_PAYMENT_INTENT_CHARGE_REQUEST:
      return {
        ...state,
        error: INITIAL_STATE.paymentIntentCharge.error,
        isLoading: true,
      };
    case actionTypes.CREATE_PAYMENT_INTENT_CHARGE_FAILURE:
    case actionTypes.FETCH_PAYMENT_INTENT_CHARGE_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      };
    case actionTypes.CREATE_PAYMENT_INTENT_CHARGE_SUCCESS:
    case actionTypes.FETCH_PAYMENT_INTENT_CHARGE_SUCCESS:
      return {
        error: INITIAL_STATE.paymentIntentCharge.error,
        isLoading: false,
        result: {
          ...action.payload,
          chargeId: get(action.meta, 'chargeId'),
        },
      };
    case actionTypes.RESET_PAYMENT_INTENT_CHARGE_STATE:
      return INITIAL_STATE.paymentIntentCharge;
    default:
      return state;
  }
};

const userCreditBalance = createReducerWithResult(
  'FETCH_USER_CREDIT_BALANCE',
  INITIAL_STATE.userCreditBalance,
  actionTypes,
  false,
  false,
  actionTypes.RESET_USER_CREDIT_BALANCE_STATE,
);

const giftCardBalance = createReducerWithResult(
  'FETCH_GIFT_CARD_BALANCE',
  INITIAL_STATE.giftCardBalance,
  actionTypes,
  false,
  false,
  actionTypes.RESET_GIFT_CARD_BALANCE_STATE,
);

const paymentIntentInstruments = (
  state = INITIAL_STATE.paymentIntentInstruments,
  action: AnyAction,
): PaymentsState['paymentIntentInstruments'] => {
  switch (action.type) {
    case actionTypes.FETCH_PAYMENT_INTENT_INSTRUMENT_REQUEST:
    case actionTypes.FETCH_PAYMENT_INTENT_INSTRUMENTS_REQUEST:
    case actionTypes.CREATE_PAYMENT_INTENT_INSTRUMENT_REQUEST:
    case actionTypes.UPDATE_PAYMENT_INTENT_INSTRUMENT_REQUEST:
    case actionTypes.REMOVE_PAYMENT_INTENT_INSTRUMENT_REQUEST:
      return {
        ...state,
        error: INITIAL_STATE.paymentIntentInstruments.error,
        isLoading: true,
      };
    case actionTypes.FETCH_PAYMENT_INTENT_INSTRUMENT_FAILURE:
    case actionTypes.FETCH_PAYMENT_INTENT_INSTRUMENTS_FAILURE:
    case actionTypes.CREATE_PAYMENT_INTENT_INSTRUMENT_FAILURE:
    case actionTypes.UPDATE_PAYMENT_INTENT_INSTRUMENT_FAILURE:
    case actionTypes.REMOVE_PAYMENT_INTENT_INSTRUMENT_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      };
    case actionTypes.FETCH_PAYMENT_INTENT_INSTRUMENT_SUCCESS:
    case actionTypes.FETCH_PAYMENT_INTENT_INSTRUMENTS_SUCCESS:
      return {
        error: INITIAL_STATE.paymentIntentInstruments.error,
        isLoading: false,
        result: action.payload.result,
      };
    case actionTypes.CREATE_PAYMENT_INTENT_INSTRUMENT_SUCCESS:
    case actionTypes.UPDATE_PAYMENT_INTENT_INSTRUMENT_SUCCESS:
      return {
        ...state,
        error: INITIAL_STATE.paymentIntentInstruments.error,
        isLoading: false,
      };
    case actionTypes.REMOVE_PAYMENT_INTENT_INSTRUMENT_SUCCESS:
      return {
        error: INITIAL_STATE.paymentIntentInstruments.error,
        isLoading: false,
        result: state?.result?.filter(
          (instrumentId: PaymentInstrument['id']) =>
            instrumentId !== action.meta.instrumentId,
        ),
      };
    case actionTypes.RESET_PAYMENT_INTENT_INSTRUMENTS_STATE:
      return INITIAL_STATE.paymentIntentInstruments;
    default:
      return state;
  }
};

const paymentIntent = createReducerWithResult(
  'FETCH_PAYMENT_INTENT',
  INITIAL_STATE.paymentIntent,
  actionTypes,
  false,
  false,
  actionTypes.RESET_PAYMENT_INTENT_STATE,
);

const paymentMethods = (
  state = INITIAL_STATE.paymentMethods,
  action: AnyAction,
): PaymentsState['paymentMethods'] => {
  switch (action.type) {
    case actionTypes.FETCH_PAYMENT_METHODS_BY_COUNTRY_AND_CURRENCY_REQUEST:
    case actionTypes.FETCH_PAYMENT_METHODS_BY_INTENT_REQUEST:
      return {
        ...state,
        error: INITIAL_STATE.paymentMethods.error,
        isLoading: true,
      };
    case actionTypes.FETCH_PAYMENT_METHODS_BY_COUNTRY_AND_CURRENCY_FAILURE:
    case actionTypes.FETCH_PAYMENT_METHODS_BY_INTENT_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      };
    case actionTypes.FETCH_PAYMENT_METHODS_BY_COUNTRY_AND_CURRENCY_SUCCESS:
    case actionTypes.FETCH_PAYMENT_METHODS_BY_INTENT_SUCCESS:
      return {
        error: INITIAL_STATE.paymentMethods.error,
        isLoading: false,
        result: action.payload,
      };
    case actionTypes.RESET_PAYMENT_METHODS_STATE:
      return INITIAL_STATE.paymentMethods;
    default:
      return state;
  }
};

const paymentTokens = (
  state = INITIAL_STATE.paymentTokens,
  action: AnyAction,
): PaymentsState['paymentTokens'] => {
  switch (action.type) {
    case actionTypes.FETCH_PAYMENT_TOKENS_REQUEST:
    case actionTypes.REMOVE_PAYMENT_TOKEN_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: INITIAL_STATE.paymentTokens.error,
      };

    case actionTypes.FETCH_PAYMENT_TOKENS_SUCCESS:
      return {
        ...state,
        result: action.payload.result,
        isLoading: false,
      };

    case actionTypes.REMOVE_PAYMENT_TOKEN_SUCCESS:
      return {
        ...state,
        result: state?.result?.filter(
          (tokenId: PaymentToken['id']) => tokenId !== action.meta.id,
        ),
        isLoading: false,
      };

    case actionTypes.FETCH_PAYMENT_TOKENS_FAILURE:
    case actionTypes.REMOVE_PAYMENT_TOKEN_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      };
    case actionTypes.RESET_PAYMENT_TOKENS_STATE:
      return INITIAL_STATE.paymentTokens;
    default:
      return state;
  }
};

const resetEntitiesStateReducer = (
  state: NonNullable<StoreState['entities']>,
) => {
  const { paymentInstruments, paymentTokens, ...rest } = state;

  return rest;
};

export const entitiesMapper = {
  [actionTypes.REMOVE_PAYMENT_TOKEN_SUCCESS]: (
    state: NonNullable<StoreState['entities']>,
    action: AnyAction,
  ) => {
    const { id } = action.meta;
    const currentPaymentTokens = state.paymentTokens;

    return {
      ...state,
      paymentTokens: omit(currentPaymentTokens, id),
    };
  },
  [actionTypes.REMOVE_PAYMENT_INTENT_INSTRUMENT_SUCCESS]: (
    state: NonNullable<StoreState['entities']>,
    action: AnyAction,
  ) => {
    const { instrumentId } = action.meta;
    const currentInstruments = state.paymentInstruments;

    return {
      ...state,
      paymentInstruments: omit(currentInstruments, instrumentId),
    };
  },
  [actionTypes.RESET_PAYMENT_INTENT_INSTRUMENTS_STATE]: (
    state: NonNullable<StoreState['entities']>,
  ) => {
    const { paymentInstruments, ...rest } = state;

    return rest;
  },
  [LOGOUT_SUCCESS]: resetEntitiesStateReducer,
  [LOGIN_SUCCESS]: resetEntitiesStateReducer,
  [REGISTER_SUCCESS]: resetEntitiesStateReducer,
  [FETCH_USER_SUCCESS]: resetEntitiesStateReducer,
  [actionTypes.RESET_PAYMENTS]: resetEntitiesStateReducer,
};

export const getPaymentTokens = (
  state: T.PaymentsState,
): T.PaymentsState['paymentTokens'] => state.paymentTokens;
export const getPaymentIntentInstruments = (
  state: T.PaymentsState,
): T.PaymentsState['paymentIntentInstruments'] =>
  state.paymentIntentInstruments;
export const getGiftCardBalance = (
  state: T.PaymentsState,
): T.PaymentsState['giftCardBalance'] => state.giftCardBalance;
export const getUserCreditBalance = (
  state: T.PaymentsState,
): T.PaymentsState['userCreditBalance'] => state.userCreditBalance;
export const getPaymentIntent = (
  state: T.PaymentsState,
): T.PaymentsState['paymentIntent'] => state.paymentIntent;
export const getPaymentIntentCharge = (
  state: T.PaymentsState,
): T.PaymentsState['paymentIntentCharge'] => state.paymentIntentCharge;
export const getPaymentMethods = (
  state: T.PaymentsState,
): T.PaymentsState['paymentMethods'] => state.paymentMethods;

const reducers = combineReducers({
  paymentIntentCharge,
  userCreditBalance,
  giftCardBalance,
  paymentIntentInstruments,
  paymentIntent,
  paymentMethods,
  paymentTokens,
});

/**
 * Reducer for payments state.
 *
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */
const paymentsReducer: Reducer<T.PaymentsState> = (state, action) => {
  if (
    action.type === LOGOUT_SUCCESS ||
    action.type === LOGIN_SUCCESS ||
    action.type === FETCH_USER_SUCCESS ||
    action.type === REGISTER_SUCCESS ||
    action.type === actionTypes.RESET_PAYMENTS
  ) {
    return INITIAL_STATE;
  }

  return reducers(state, action);
};

export default paymentsReducer;
