/**
 * @module payments/reducer
 * @category Payments
 * @subcategory Reducer
 */
import * as actionTypes from './actionTypes';
import { combineReducers } from 'redux';
import { createReducerWithResult } from '../helpers';
import { LOGOUT_SUCCESS } from '../authentication/actionTypes';
import get from 'lodash/get';
import omit from 'lodash/omit';
import type * as T from './types';
import type {
  Charges,
  Instrument,
  PaymentToken,
} from '@farfetch/blackout-client/payments/types';
import type { LogoutSuccessAction } from '../authentication/types';
import type {
  ReducerSwitch,
  StateWithResult,
  StateWithResultArray,
  StoreState,
} from '../types';

export const INITIAL_STATE: T.State = {
  charges: {
    error: null,
    isLoading: false,
    result: null,
  },
  creditBalance: {
    error: null,
    isLoading: false,
    result: null,
  },
  giftCardBalance: {
    error: null,
    isLoading: false,
    result: null,
  },
  instruments: {
    error: null,
    isLoading: false,
    result: null,
  },
  intent: {
    error: null,
    isLoading: false,
    result: null,
  },
  paymentMethods: {
    error: null,
    isLoading: false,
    result: null,
  },
  tokens: {
    error: null,
    isLoading: false,
    result: null,
  },
};

const charges = (
  state = INITIAL_STATE.charges,
  action:
    | T.ChargesFailureAction
    | T.ChargesRequestAction
    | T.ChargesSuccessAction
    | T.FetchChargesFailureAction
    | T.FetchChargesRequestAction
    | T.FetchChargesSuccessAction
    | T.ResetChargesSuccessAction
    | LogoutSuccessAction,
): StateWithResult<Charges> => {
  switch (action.type) {
    case actionTypes.CHARGE_REQUEST:
    case actionTypes.FETCH_CHARGES_REQUEST:
      return {
        ...state,
        error: INITIAL_STATE.charges.error,
        isLoading: true,
      };
    case actionTypes.CHARGE_FAILURE:
    case actionTypes.FETCH_CHARGES_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      };
    case actionTypes.CHARGE_SUCCESS:
    case actionTypes.FETCH_CHARGES_SUCCESS:
      return {
        error: INITIAL_STATE.charges.error,
        isLoading: false,
        result: {
          ...action.payload,
          chargeId: get(action.meta, 'chargeId'),
        },
      };
    case actionTypes.RESET_CHARGES_STATE:
    case LOGOUT_SUCCESS:
      return INITIAL_STATE.charges;
    default:
      return state;
  }
};

const creditBalance = createReducerWithResult(
  'FETCH_CREDIT_BALANCE',
  INITIAL_STATE.creditBalance,
  actionTypes,
);

const giftCardBalance = createReducerWithResult(
  'FETCH_GIFT_CARD_BALANCE',
  INITIAL_STATE.giftCardBalance,
  actionTypes,
);

const instruments = (
  state = INITIAL_STATE.instruments,
  action:
    | T.CreateInstrumentsFailureAction
    | T.CreateInstrumentsRequestAction
    | T.CreateInstrumentsSuccessAction
    | T.FetchInstrumentFailureAction
    | T.FetchInstrumentRequestAction
    | T.FetchInstrumentSuccessAction
    | T.FetchInstrumentsFailureAction
    | T.FetchInstrumentsRequestAction
    | T.FetchInstrumentsSuccessAction
    | T.RemoveInstrumentFailureAction
    | T.RemoveInstrumentRequestAction
    | T.RemoveInstrumentSuccessAction
    | T.UpdateInstrumentFailureAction
    | T.UpdateInstrumentRequestAction
    | T.UpdateInstrumentSuccessAction
    | T.ResetInstrumentsSuccessAction
    | LogoutSuccessAction,
): StateWithResultArray<Instrument['id']> => {
  switch (action.type) {
    case actionTypes.FETCH_INSTRUMENT_REQUEST:
    case actionTypes.FETCH_INSTRUMENTS_REQUEST:
    case actionTypes.CREATE_INSTRUMENT_REQUEST:
    case actionTypes.UPDATE_INSTRUMENT_REQUEST:
    case actionTypes.REMOVE_INSTRUMENT_REQUEST:
      return {
        ...state,
        error: INITIAL_STATE.instruments.error,
        isLoading: true,
      };
    case actionTypes.FETCH_INSTRUMENT_FAILURE:
    case actionTypes.FETCH_INSTRUMENTS_FAILURE:
    case actionTypes.CREATE_INSTRUMENT_FAILURE:
    case actionTypes.UPDATE_INSTRUMENT_FAILURE:
    case actionTypes.REMOVE_INSTRUMENT_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      };
    case actionTypes.FETCH_INSTRUMENT_SUCCESS:
    case actionTypes.FETCH_INSTRUMENTS_SUCCESS:
      return {
        error: INITIAL_STATE.instruments.error,
        isLoading: false,
        result: action.payload.result,
      };
    case actionTypes.CREATE_INSTRUMENT_SUCCESS:
    case actionTypes.UPDATE_INSTRUMENT_SUCCESS:
      return {
        ...state,
        error: INITIAL_STATE.instruments.error,
        isLoading: false,
      };
    case actionTypes.REMOVE_INSTRUMENT_SUCCESS:
      return {
        error: INITIAL_STATE.tokens.error,
        isLoading: false,
        result: state?.result?.filter(
          (instrumentId: Instrument['id']) =>
            instrumentId !== action.meta.instrumentId,
        ),
      };
    case actionTypes.RESET_INSTRUMENTS_STATE:
    case LOGOUT_SUCCESS:
      return INITIAL_STATE.instruments;
    default:
      return state;
  }
};

const intent = createReducerWithResult(
  'FETCH_INTENT',
  INITIAL_STATE.intent,
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

const tokens = (
  state = INITIAL_STATE.tokens,
  action:
    | T.FetchPaymentTokensFailureAction
    | T.FetchPaymentTokensRequestAction
    | T.FetchPaymentTokensSuccessAction
    | T.RemovePaymentTokensFailureAction
    | T.RemovePaymentTokensRequestAction
    | T.RemovePaymentTokensSuccessAction
    | LogoutSuccessAction,
): StateWithResultArray<PaymentToken['id']> => {
  switch (action.type) {
    case actionTypes.FETCH_PAYMENT_TOKENS_REQUEST:
    case actionTypes.REMOVE_PAYMENT_TOKEN_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: INITIAL_STATE.tokens.error,
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
      return INITIAL_STATE.tokens;
    default:
      return state;
  }
};

export const entitiesMapper = {
  [actionTypes.REMOVE_PAYMENT_TOKEN_SUCCESS as typeof actionTypes.REMOVE_PAYMENT_TOKEN_SUCCESS]:
    (
      state: StoreState['entities'],
      action: T.RemovePaymentTokensSuccessAction,
    ): StoreState['entities'] => {
      const { id } = action.meta;
      const currentPaymentTokens = state.paymentTokens;

      return {
        ...state,
        paymentTokens: omit(currentPaymentTokens, id),
      };
    },
  [actionTypes.REMOVE_INSTRUMENT_SUCCESS as typeof actionTypes.REMOVE_INSTRUMENT_SUCCESS]:
    (
      state: StoreState['entities'],
      action: T.RemoveInstrumentSuccessAction,
    ): StoreState['entities'] => {
      const { instrumentId } = action.meta;
      const currentInstruments = state.instruments;

      return {
        ...state,
        instruments: omit(currentInstruments, instrumentId),
      };
    },
  [actionTypes.RESET_INSTRUMENTS_STATE as typeof actionTypes.RESET_INSTRUMENTS_STATE]:
    (state: StoreState['entities']): StoreState['entities'] => {
      return {
        ...state,
        instruments: {},
      };
    },
  [LOGOUT_SUCCESS as typeof LOGOUT_SUCCESS]: (
    state: StoreState['entities'],
  ): StoreState['entities'] => {
    return {
      ...state,
      instruments: {},
      paymentTokens: {},
      checkoutOrders: {},
    };
  },
};

export const getTokens = (state: T.State): T.State['tokens'] => state.tokens;
export const getInstruments = (state: T.State): T.State['instruments'] =>
  state.instruments;
export const getGiftCardBalance = (
  state: T.State,
): T.State['giftCardBalance'] => state.giftCardBalance;
export const getCreditBalance = (state: T.State): T.State['creditBalance'] =>
  state.creditBalance;
export const getIntent = (state: T.State): T.State['intent'] => state.intent;
export const getCharges = (state: T.State): T.State['charges'] => state.charges;
export const getPaymentMethods = (state: T.State): T.State['paymentMethods'] =>
  state.paymentMethods;

const reducers = combineReducers({
  charges,
  creditBalance,
  giftCardBalance,
  instruments,
  intent,
  paymentMethods,
  tokens,
});

/**
 * Reducer for payments state.
 *
 * @function paymentsReducer
 * @static
 *
 * @param {object} state - Current redux state.
 * @param {object} action - Action dispatched.
 *
 * @returns {object} New state.
 */
const paymentsReducer: ReducerSwitch<
  T.State,
  | T.ChargesAction
  | T.CreateInstrumentsAction
  | T.FetchCreditBalanceAction
  | T.FetchGiftCardBalanceAction
  | T.FetchChargesAction
  | T.FetchInstrumentAction
  | T.FetchInstrumentsAction
  | T.FetchIntentAction
  | T.FetchPaymentTokensAction
  | T.FetchPaymentMethodsAction
  | T.FetchPaymentMethodsByCountryAndCurrencyAction
  | T.FetchPaymentMethodsByIntentAction
  | T.RemoveInstrumentAction
  | T.RemovePaymentTokensAction
  | T.UpdateInstrumentAction
  | T.ResetChargesAction
  | T.ResetInstrumentsAction
> = (state, action) => reducers(state, action);

export default paymentsReducer;
