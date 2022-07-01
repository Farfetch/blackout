import * as actionTypes from './actionTypes';
import { AnyAction, combineReducers } from 'redux';
import { createReducerWithResult } from '../helpers/reducerFactory';
import { LOGOUT_SUCCESS } from '../users/authentication/actionTypes';
import get from 'lodash/get';
import omit from 'lodash/omit';
import type * as T from './types';
import type { LogoutSuccessAction } from '../users';
import type {
  PaymentInstrument,
  PaymentToken,
} from '@farfetch/blackout-client';
import type { PaymentsState } from './types';
import type { ReducerSwitch, StoreState } from '../types';

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
  paymentInstruments: {
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
  action:
    | T.CreatePaymentIntentChargeFailureAction
    | T.CreatePaymentIntentChargeRequestAction
    | T.CreatePaymentIntentChargeSuccessAction
    | T.FetchPaymentIntentChargeFailureAction
    | T.FetchPaymentIntentChargeRequestAction
    | T.FetchPaymentIntentChargeSuccessAction
    | T.ResetPaymentIntentChargeSuccessAction
    | LogoutSuccessAction,
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
    case LOGOUT_SUCCESS:
      return INITIAL_STATE.paymentIntentCharge;
    default:
      return state;
  }
};

const userCreditBalance = createReducerWithResult(
  'FETCH_USER_CREDIT_BALANCE',
  INITIAL_STATE.userCreditBalance,
  actionTypes,
);

const giftCardBalance = createReducerWithResult(
  'FETCH_GIFT_CARD_BALANCE',
  INITIAL_STATE.giftCardBalance,
  actionTypes,
);

const paymentInstruments = (
  state = INITIAL_STATE.paymentInstruments,
  action:
    | T.CreatePaymentIntentInstrumentFailureAction
    | T.CreatePaymentIntentInstrumentRequestAction
    | T.CreatePaymentIntentInstrumentSuccessAction
    | T.FetchPaymentIntentInstrumentFailureAction
    | T.FetchPaymentIntentInstrumentRequestAction
    | T.FetchPaymentIntentInstrumentSuccessAction
    | T.FetchPaymentIntentInstrumentsFailureAction
    | T.FetchPaymentIntentInstrumentsRequestAction
    | T.FetchPaymentIntentInstrumentsSuccessAction
    | T.RemovePaymentIntentInstrumentFailureAction
    | T.RemovePaymentIntentInstrumentRequestAction
    | T.RemovePaymentIntentInstrumentSuccessAction
    | T.UpdatePaymentIntentInstrumentFailureAction
    | T.UpdatePaymentIntentInstrumentRequestAction
    | T.UpdatePaymentIntentInstrumentSuccessAction
    | T.ResetPaymentInstrumentsSuccessAction
    | LogoutSuccessAction,
): PaymentsState['paymentInstruments'] => {
  switch (action.type) {
    case actionTypes.FETCH_PAYMENT_INTENT_INSTRUMENT_REQUEST:
    case actionTypes.FETCH_PAYMENT_INTENT_INSTRUMENTS_REQUEST:
    case actionTypes.CREATE_PAYMENT_INTENT_INSTRUMENT_REQUEST:
    case actionTypes.UPDATE_PAYMENT_INTENT_INSTRUMENT_REQUEST:
    case actionTypes.REMOVE_PAYMENT_INTENT_INSTRUMENT_REQUEST:
      return {
        ...state,
        error: INITIAL_STATE.paymentInstruments.error,
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
        error: INITIAL_STATE.paymentInstruments.error,
        isLoading: false,
        result: action.payload.result,
      };
    case actionTypes.CREATE_PAYMENT_INTENT_INSTRUMENT_SUCCESS:
    case actionTypes.UPDATE_PAYMENT_INTENT_INSTRUMENT_SUCCESS:
      return {
        ...state,
        error: INITIAL_STATE.paymentInstruments.error,
        isLoading: false,
      };
    case actionTypes.REMOVE_PAYMENT_INTENT_INSTRUMENT_SUCCESS:
      return {
        error: INITIAL_STATE.paymentInstruments.error,
        isLoading: false,
        result: state?.result?.filter(
          (instrumentId: PaymentInstrument['id']) =>
            instrumentId !== action.meta.instrumentId,
        ),
      };
    case actionTypes.RESET_PAYMENT_INSTRUMENTS_STATE:
    case LOGOUT_SUCCESS:
      return INITIAL_STATE.paymentInstruments;
    default:
      return state;
  }
};

const paymentIntent = createReducerWithResult(
  'FETCH_PAYMENT_INTENT',
  INITIAL_STATE.paymentIntent,
  actionTypes,
);

const paymentMethods = createReducerWithResult(
  [
    'FETCH_PAYMENT_METHODS_BY_COUNTRY_AND_CURRENCY',
    'FETCH_PAYMENT_METHODS_BY_INTENT',
  ],
  INITIAL_STATE.paymentMethods,
  actionTypes,
  false,
  true,
);

const paymentTokens = (
  state = INITIAL_STATE.paymentTokens,
  action:
    | T.FetchPaymentTokensFailureAction
    | T.FetchPaymentTokensRequestAction
    | T.FetchPaymentTokensSuccessAction
    | T.RemovePaymentTokensFailureAction
    | T.RemovePaymentTokensRequestAction
    | T.RemovePaymentTokensSuccessAction
    | LogoutSuccessAction,
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

    case LOGOUT_SUCCESS:
      return INITIAL_STATE.paymentTokens;
    default:
      return state;
  }
};

export const entitiesMapper = {
  [actionTypes.REMOVE_PAYMENT_TOKEN_SUCCESS]: (
    state: NonNullable<StoreState['entities']>,
    action: AnyAction,
  ): StoreState['entities'] => {
    if (!state) {
      return state;
    }

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
  ): StoreState['entities'] => {
    if (!state) {
      return state;
    }
    const { instrumentId } = action.meta;
    const currentInstruments = state.paymentInstruments;
    return {
      ...state,
      paymentInstruments: omit(currentInstruments, instrumentId),
    };
  },
  [actionTypes.RESET_PAYMENT_INSTRUMENTS_STATE]: (
    state: NonNullable<StoreState['entities']>,
  ): StoreState['entities'] => {
    return {
      ...state,
      paymentInstruments: {},
    };
  },
  [LOGOUT_SUCCESS]: (
    state: NonNullable<StoreState['entities']>,
  ): StoreState['entities'] => {
    return {
      ...state,
      paymentInstruments: {},
      paymentTokens: {},
      checkoutOrders: {},
    };
  },
};

export const getPaymentTokens = (
  state: T.PaymentsState,
): T.PaymentsState['paymentTokens'] => state.paymentTokens;
export const getPaymentInstruments = (
  state: T.PaymentsState,
): T.PaymentsState['paymentInstruments'] => state.paymentInstruments;
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
  paymentInstruments,
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
const paymentsReducer: ReducerSwitch<
  T.PaymentsState,
  | T.CreatePaymentIntentChargeAction
  | T.CreatePaymentIntentInstrumentAction
  | T.FetchUserCreditBalanceAction
  | T.FetchGiftCardBalanceAction
  | T.FetchPaymentIntentChargeAction
  | T.FetchPaymentIntentInstrumentAction
  | T.FetchPaymentIntentInstrumentsAction
  | T.FetchPaymentIntentAction
  | T.FetchPaymentTokensAction
  | T.FetchPaymentMethodsAction
  | T.FetchPaymentMethodsByCountryAndCurrencyAction
  | T.FetchPaymentMethodsByIntentAction
  | T.RemovePaymentIntentInstrumentAction
  | T.RemovePaymentTokensAction
  | T.UpdatePaymentIntentInstrumentAction
  | T.ResetPaymentIntentChargeAction
  | T.ResetPaymentInstrumentsAction
> = (state, action) => reducers(state, action);

export default paymentsReducer;
