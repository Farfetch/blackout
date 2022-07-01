import type * as actionTypes from '../actionTypes';
import type { Action } from 'redux';
import type {
  Balance,
  BlackoutError,
  PaymentInstrument,
  PaymentIntent,
  PaymentIntentCharge,
  PaymentMethods,
  PaymentToken,
} from '@farfetch/blackout-client';
import type { NormalizedSchema } from 'normalizr';

/**
 * Create Payment Intent Charge Action.
 */
export type CreatePaymentIntentChargeAction =
  | CreatePaymentIntentChargeFailureAction
  | CreatePaymentIntentChargeRequestAction
  | CreatePaymentIntentChargeSuccessAction;

export interface CreatePaymentIntentChargeFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.CREATE_PAYMENT_INTENT_CHARGE_FAILURE;
}

export interface CreatePaymentIntentChargeRequestAction extends Action {
  type: typeof actionTypes.CREATE_PAYMENT_INTENT_CHARGE_REQUEST;
}

export interface CreatePaymentIntentChargeSuccessAction extends Action {
  payload: PaymentIntentCharge;
  meta: { chargeId: string };
  type: typeof actionTypes.CREATE_PAYMENT_INTENT_CHARGE_SUCCESS;
}

/**
 * Create Payment Intent Instrument Action.
 */
export type CreatePaymentIntentInstrumentAction =
  | CreatePaymentIntentInstrumentFailureAction
  | CreatePaymentIntentInstrumentRequestAction
  | CreatePaymentIntentInstrumentSuccessAction;

export interface CreatePaymentIntentInstrumentFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.CREATE_PAYMENT_INTENT_INSTRUMENT_FAILURE;
}

export interface CreatePaymentIntentInstrumentRequestAction extends Action {
  type: typeof actionTypes.CREATE_PAYMENT_INTENT_INSTRUMENT_REQUEST;
}

export interface CreatePaymentIntentInstrumentSuccessAction extends Action {
  type: typeof actionTypes.CREATE_PAYMENT_INTENT_INSTRUMENT_SUCCESS;
}

/**
 * Fetch User Credit Balance Action.
 */
export type FetchUserCreditBalanceAction =
  | FetchUserCreditBalanceFailureAction
  | FetchUserCreditBalanceRequestAction
  | FetchUserCreditBalanceSuccessAction;

export interface FetchUserCreditBalanceFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_USER_CREDIT_BALANCE_FAILURE;
}

export interface FetchUserCreditBalanceRequestAction extends Action {
  type: typeof actionTypes.FETCH_USER_CREDIT_BALANCE_REQUEST;
}

export interface FetchUserCreditBalanceSuccessAction extends Action {
  payload: Balance;
  type: typeof actionTypes.FETCH_USER_CREDIT_BALANCE_SUCCESS;
}

/**
 * Fetch Gift Card Balance Action.
 */
export type FetchGiftCardBalanceAction =
  | FetchGiftCardBalanceFailureAction
  | FetchGiftCardBalanceRequestAction
  | FetchGiftCardBalanceSuccessAction;

export interface FetchGiftCardBalanceFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_GIFT_CARD_BALANCE_FAILURE;
}

export interface FetchGiftCardBalanceRequestAction extends Action {
  type: typeof actionTypes.FETCH_GIFT_CARD_BALANCE_REQUEST;
}

export interface FetchGiftCardBalanceSuccessAction extends Action {
  payload: Balance;
  type: typeof actionTypes.FETCH_GIFT_CARD_BALANCE_SUCCESS;
}

/**
 * Fetch Payment Intent Charge Actions.
 */
export type FetchPaymentIntentChargeAction =
  | FetchPaymentIntentChargeFailureAction
  | FetchPaymentIntentChargeRequestAction
  | FetchPaymentIntentChargeSuccessAction;

export interface FetchPaymentIntentChargeFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_PAYMENT_INTENT_CHARGE_FAILURE;
}

export interface FetchPaymentIntentChargeRequestAction extends Action {
  type: typeof actionTypes.FETCH_PAYMENT_INTENT_CHARGE_REQUEST;
}

export interface FetchPaymentIntentChargeSuccessAction extends Action {
  payload: PaymentIntentCharge;
  meta: { chargeId: string };
  type: typeof actionTypes.FETCH_PAYMENT_INTENT_CHARGE_SUCCESS;
}

type FetchPaymentIntentInstrumentPayload = NormalizedSchema<
  {
    instruments: Record<PaymentInstrument['id'], PaymentInstrument>;
  },
  Array<PaymentInstrument['id']>
>;

/**
 * Fetch Payment Intent Instrument Action.
 */
export type FetchPaymentIntentInstrumentAction =
  | FetchPaymentIntentInstrumentFailureAction
  | FetchPaymentIntentInstrumentRequestAction
  | FetchPaymentIntentInstrumentSuccessAction;

export interface FetchPaymentIntentInstrumentFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_PAYMENT_INTENT_INSTRUMENT_FAILURE;
}

export interface FetchPaymentIntentInstrumentRequestAction extends Action {
  type: typeof actionTypes.FETCH_PAYMENT_INTENT_INSTRUMENT_REQUEST;
}

export interface FetchPaymentIntentInstrumentSuccessAction extends Action {
  payload: FetchPaymentIntentInstrumentPayload;
  type: typeof actionTypes.FETCH_PAYMENT_INTENT_INSTRUMENT_SUCCESS;
}

/**
 * Fetch Payment Intent Instruments Action.
 */
export type FetchPaymentIntentInstrumentsAction =
  | FetchPaymentIntentInstrumentsFailureAction
  | FetchPaymentIntentInstrumentsRequestAction
  | FetchPaymentIntentInstrumentsSuccessAction;

export interface FetchPaymentIntentInstrumentsFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_PAYMENT_INTENT_INSTRUMENTS_FAILURE;
}

export interface FetchPaymentIntentInstrumentsRequestAction extends Action {
  type: typeof actionTypes.FETCH_PAYMENT_INTENT_INSTRUMENTS_REQUEST;
}

export interface FetchPaymentIntentInstrumentsSuccessAction extends Action {
  payload: FetchPaymentIntentInstrumentPayload;
  type: typeof actionTypes.FETCH_PAYMENT_INTENT_INSTRUMENTS_SUCCESS;
}

/**
 * Fetch Payment Intent Actions.
 */
export type FetchPaymentIntentAction =
  | FetchPaymentIntentFailureAction
  | FetchPaymentIntentRequestAction
  | FetchPaymentIntentSuccessAction;

export interface FetchPaymentIntentFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_PAYMENT_INTENT_FAILURE;
}

export interface FetchPaymentIntentRequestAction extends Action {
  type: typeof actionTypes.FETCH_PAYMENT_INTENT_REQUEST;
}

export interface FetchPaymentIntentSuccessAction extends Action {
  payload: PaymentIntent;
  type: typeof actionTypes.FETCH_PAYMENT_INTENT_SUCCESS;
}

type FetchPaymentTokensPayload = NormalizedSchema<
  {
    paymentTokens: Record<PaymentToken['id'], PaymentToken>;
  },
  Array<PaymentToken['id']>
>;

/**
 * Fetch Payment Tokens Actions.
 */
export type FetchPaymentTokensAction =
  | FetchPaymentTokensFailureAction
  | FetchPaymentTokensRequestAction
  | FetchPaymentTokensSuccessAction;

export interface FetchPaymentTokensFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_PAYMENT_TOKENS_FAILURE;
}

export interface FetchPaymentTokensRequestAction extends Action {
  type: typeof actionTypes.FETCH_PAYMENT_TOKENS_REQUEST;
}

export interface FetchPaymentTokensSuccessAction extends Action {
  payload: FetchPaymentTokensPayload;
  type: typeof actionTypes.FETCH_PAYMENT_TOKENS_SUCCESS;
}

/**
 * Fetch Payment Methods Actions.
 */
export type FetchPaymentMethodsAction =
  | FetchPaymentMethodsFailureAction
  | FetchPaymentMethodsRequestAction
  | FetchPaymentMethodsSuccessAction;

export interface FetchPaymentMethodsFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_PAYMENT_METHODS_FAILURE;
}

export interface FetchPaymentMethodsRequestAction extends Action {
  type: typeof actionTypes.FETCH_PAYMENT_METHODS_REQUEST;
}

export interface FetchPaymentMethodsSuccessAction extends Action {
  payload: {
    entities: {
      checkout: Record<number, { paymentMethods: PaymentMethods }>;
    };
  };
  type: typeof actionTypes.FETCH_PAYMENT_METHODS_SUCCESS;
}

/**
 * Fetch Payment Methods By Country and Currency Actions.
 */
export type FetchPaymentMethodsByCountryAndCurrencyAction =
  | FetchPaymentMethodsByCountryAndCurrencyFailureAction
  | FetchPaymentMethodsByCountryAndCurrencyRequestAction
  | FetchPaymentMethodsByCountryAndCurrencySuccessAction;

export interface FetchPaymentMethodsByCountryAndCurrencyFailureAction
  extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_PAYMENT_METHODS_BY_COUNTRY_AND_CURRENCY_FAILURE;
}

export interface FetchPaymentMethodsByCountryAndCurrencyRequestAction
  extends Action {
  type: typeof actionTypes.FETCH_PAYMENT_METHODS_BY_COUNTRY_AND_CURRENCY_REQUEST;
}

export interface FetchPaymentMethodsByCountryAndCurrencySuccessAction
  extends Action {
  payload: PaymentMethods[];
  type: typeof actionTypes.FETCH_PAYMENT_METHODS_BY_COUNTRY_AND_CURRENCY_SUCCESS;
}

/**
 * Fetch Payment Methods By Intent Actions.
 */
export type FetchPaymentMethodsByIntentAction =
  | FetchPaymentMethodsByIntentFailureAction
  | FetchPaymentMethodsByIntentRequestAction
  | FetchPaymentMethodsByIntentSuccessAction;

export interface FetchPaymentMethodsByIntentFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_PAYMENT_METHODS_BY_INTENT_FAILURE;
}

export interface FetchPaymentMethodsByIntentRequestAction extends Action {
  type: typeof actionTypes.FETCH_PAYMENT_METHODS_BY_INTENT_REQUEST;
}

export interface FetchPaymentMethodsByIntentSuccessAction extends Action {
  payload: PaymentMethods;
  type: typeof actionTypes.FETCH_PAYMENT_METHODS_BY_INTENT_SUCCESS;
}

/**
 * Remove Payment Intent Instrument Actions.
 */
export type RemovePaymentIntentInstrumentAction =
  | RemovePaymentIntentInstrumentFailureAction
  | RemovePaymentIntentInstrumentRequestAction
  | RemovePaymentIntentInstrumentSuccessAction;

export interface RemovePaymentIntentInstrumentFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.REMOVE_PAYMENT_INTENT_INSTRUMENT_FAILURE;
}

export interface RemovePaymentIntentInstrumentRequestAction extends Action {
  type: typeof actionTypes.REMOVE_PAYMENT_INTENT_INSTRUMENT_REQUEST;
}

export interface RemovePaymentIntentInstrumentSuccessAction extends Action {
  meta: { instrumentId: PaymentInstrument['id'] };
  type: typeof actionTypes.REMOVE_PAYMENT_INTENT_INSTRUMENT_SUCCESS;
}

/**
 * Remove Payment Tokens Actions.
 */
export type RemovePaymentTokensAction =
  | RemovePaymentTokensFailureAction
  | RemovePaymentTokensRequestAction
  | RemovePaymentTokensSuccessAction;

export interface RemovePaymentTokensFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.REMOVE_PAYMENT_TOKEN_FAILURE;
}

export interface RemovePaymentTokensRequestAction extends Action {
  type: typeof actionTypes.REMOVE_PAYMENT_TOKEN_REQUEST;
}

export interface RemovePaymentTokensSuccessAction extends Action {
  meta: { id: PaymentToken['id'] };
  type: typeof actionTypes.REMOVE_PAYMENT_TOKEN_SUCCESS;
}

/**
 * Update Payment Intent Instrument Actions.
 */
export type UpdatePaymentIntentInstrumentAction =
  | UpdatePaymentIntentInstrumentFailureAction
  | UpdatePaymentIntentInstrumentRequestAction
  | UpdatePaymentIntentInstrumentSuccessAction;

export interface UpdatePaymentIntentInstrumentFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.UPDATE_PAYMENT_INTENT_INSTRUMENT_FAILURE;
}

export interface UpdatePaymentIntentInstrumentRequestAction extends Action {
  type: typeof actionTypes.UPDATE_PAYMENT_INTENT_INSTRUMENT_REQUEST;
}

export interface UpdatePaymentIntentInstrumentSuccessAction extends Action {
  type: typeof actionTypes.UPDATE_PAYMENT_INTENT_INSTRUMENT_SUCCESS;
}

/**
 * Reset Payment Intent Charge Actions.
 */
export type ResetPaymentIntentChargeAction =
  ResetPaymentIntentChargeSuccessAction;

export interface ResetPaymentIntentChargeSuccessAction extends Action {
  type: typeof actionTypes.RESET_PAYMENT_INTENT_CHARGE_STATE;
}

/**
 * Reset Payment Instruments Actions.
 */
export type ResetPaymentInstrumentsAction =
  ResetPaymentInstrumentsSuccessAction;

export interface ResetPaymentInstrumentsSuccessAction extends Action {
  type: typeof actionTypes.RESET_PAYMENT_INSTRUMENTS_STATE;
}
