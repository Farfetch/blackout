import type * as actionTypes from '../actionTypes';
import type { Action } from 'redux';
import type {
  Balance,
  Charge,
  Instrument,
  Intent,
  PaymentMethod,
  PaymentMethods,
  PaymentToken,
} from '@farfetch/blackout-client/payments/types';
import type { Error } from '@farfetch/blackout-client/types';
import type { NormalizedSchema } from 'normalizr';

/**
 * Charges Action.
 */
export type ChargesAction =
  | ChargesFailureAction
  | ChargesRequestAction
  | ChargesSuccessAction;

export interface ChargesFailureAction extends Action {
  payload: { error: Error };
  type: typeof actionTypes.CHARGE_FAILURE;
}

export interface ChargesRequestAction extends Action {
  type: typeof actionTypes.CHARGE_REQUEST;
}

export interface ChargesSuccessAction extends Action {
  payload: Charge;
  meta: { chargeId: string };
  type: typeof actionTypes.CHARGE_SUCCESS;
}

/**
 * Create Instruments Action.
 */
export type CreateInstrumentsAction =
  | CreateInstrumentsFailureAction
  | CreateInstrumentsRequestAction
  | CreateInstrumentsSuccessAction;

export interface CreateInstrumentsFailureAction extends Action {
  payload: { error: Error };
  type: typeof actionTypes.CREATE_INSTRUMENT_FAILURE;
}

export interface CreateInstrumentsRequestAction extends Action {
  type: typeof actionTypes.CREATE_INSTRUMENT_REQUEST;
}

export interface CreateInstrumentsSuccessAction extends Action {
  type: typeof actionTypes.CREATE_INSTRUMENT_SUCCESS;
}

/**
 * Fetch Credit Balance Action.
 */
export type FetchCreditBalanceAction =
  | FetchCreditBalanceFailureAction
  | FetchCreditBalanceRequestAction
  | FetchCreditBalanceSuccessAction;

export interface FetchCreditBalanceFailureAction extends Action {
  payload: { error: Error };
  type: typeof actionTypes.FETCH_CREDIT_BALANCE_FAILURE;
}

export interface FetchCreditBalanceRequestAction extends Action {
  type: typeof actionTypes.FETCH_CREDIT_BALANCE_REQUEST;
}

export interface FetchCreditBalanceSuccessAction extends Action {
  payload: Balance;
  type: typeof actionTypes.FETCH_CREDIT_BALANCE_SUCCESS;
}

/**
 * Fetch Gift Card Balance Action.
 */
export type FetchGiftCardBalanceAction =
  | FetchGiftCardBalanceFailureAction
  | FetchGiftCardBalanceRequestAction
  | FetchGiftCardBalanceSuccessAction;

export interface FetchGiftCardBalanceFailureAction extends Action {
  payload: { error: Error };
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
 * Fetch Charges Action.
 */
export type FetchChargesAction =
  | FetchChargesFailureAction
  | FetchChargesRequestAction
  | FetchChargesSuccessAction;

export interface FetchChargesFailureAction extends Action {
  payload: { error: Error };
  type: typeof actionTypes.FETCH_CHARGES_FAILURE;
}

export interface FetchChargesRequestAction extends Action {
  type: typeof actionTypes.FETCH_CHARGES_REQUEST;
}

export interface FetchChargesSuccessAction extends Action {
  payload: Charge;
  meta: { chargeId: string };
  type: typeof actionTypes.FETCH_CHARGES_SUCCESS;
}

type FetchInstrumentPayload = NormalizedSchema<
  {
    instruments: Record<Instrument['id'], Instrument>;
  },
  Array<Instrument['id']>
>;

type FetchInstrumentsPayload = NormalizedSchema<
  {
    instruments: Record<Instrument['id'], Instrument>;
  },
  Array<Instrument['id']>
>;

/**
 * Fetch Instrument Action.
 */
export type FetchInstrumentAction =
  | FetchInstrumentFailureAction
  | FetchInstrumentRequestAction
  | FetchInstrumentSuccessAction;

export interface FetchInstrumentFailureAction extends Action {
  payload: { error: Error };
  type: typeof actionTypes.FETCH_INSTRUMENT_FAILURE;
}

export interface FetchInstrumentRequestAction extends Action {
  type: typeof actionTypes.FETCH_INSTRUMENT_REQUEST;
}

export interface FetchInstrumentSuccessAction extends Action {
  payload: FetchInstrumentPayload;
  type: typeof actionTypes.FETCH_INSTRUMENT_SUCCESS;
}

/**
 * Fetch Instruments Action.
 */
export type FetchInstrumentsAction =
  | FetchInstrumentsFailureAction
  | FetchInstrumentsRequestAction
  | FetchInstrumentsSuccessAction;

export interface FetchInstrumentsFailureAction extends Action {
  payload: { error: Error };
  type: typeof actionTypes.FETCH_INSTRUMENTS_FAILURE;
}

export interface FetchInstrumentsRequestAction extends Action {
  type: typeof actionTypes.FETCH_INSTRUMENTS_REQUEST;
}

export interface FetchInstrumentsSuccessAction extends Action {
  payload: FetchInstrumentsPayload;
  type: typeof actionTypes.FETCH_INSTRUMENTS_SUCCESS;
}

/**
 * Fetch Intent Actions.
 */
export type FetchIntentAction =
  | FetchIntentFailureAction
  | FetchIntentRequestAction
  | FetchIntentSuccessAction;

export interface FetchIntentFailureAction extends Action {
  payload: { error: Error };
  type: typeof actionTypes.FETCH_INTENT_FAILURE;
}

export interface FetchIntentRequestAction extends Action {
  type: typeof actionTypes.FETCH_INTENT_REQUEST;
}

export interface FetchIntentSuccessAction extends Action {
  payload: Intent;
  type: typeof actionTypes.FETCH_INTENT_SUCCESS;
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
  payload: { error: Error };
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
  payload: { error: Error };
  type: typeof actionTypes.FETCH_PAYMENT_METHODS_FAILURE;
}

export interface FetchPaymentMethodsRequestAction extends Action {
  type: typeof actionTypes.FETCH_PAYMENT_METHODS_REQUEST;
}

export interface FetchPaymentMethodsSuccessAction extends Action {
  payload: {
    entities: {
      checkout: Record<number, { paymentMethods: PaymentMethod }>;
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
  payload: { error: Error };
  type: typeof actionTypes.FETCH_PAYMENT_METHODS_BY_COUNTRY_AND_CURRENCY_FAILURE;
}

export interface FetchPaymentMethodsByCountryAndCurrencyRequestAction
  extends Action {
  type: typeof actionTypes.FETCH_PAYMENT_METHODS_BY_COUNTRY_AND_CURRENCY_REQUEST;
}

export interface FetchPaymentMethodsByCountryAndCurrencySuccessAction
  extends Action {
  payload: PaymentMethods;
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
  payload: { error: Error };
  type: typeof actionTypes.FETCH_PAYMENT_METHODS_BY_INTENT_FAILURE;
}

export interface FetchPaymentMethodsByIntentRequestAction extends Action {
  type: typeof actionTypes.FETCH_PAYMENT_METHODS_BY_INTENT_REQUEST;
}

export interface FetchPaymentMethodsByIntentSuccessAction extends Action {
  payload: PaymentMethod;
  type: typeof actionTypes.FETCH_PAYMENT_METHODS_BY_INTENT_SUCCESS;
}

/**
 * Remove Instrument Actions.
 */
export type RemoveInstrumentAction =
  | RemoveInstrumentFailureAction
  | RemoveInstrumentRequestAction
  | RemoveInstrumentSuccessAction;

export interface RemoveInstrumentFailureAction extends Action {
  payload: { error: Error };
  type: typeof actionTypes.REMOVE_INSTRUMENT_FAILURE;
}

export interface RemoveInstrumentRequestAction extends Action {
  type: typeof actionTypes.REMOVE_INSTRUMENT_REQUEST;
}

export interface RemoveInstrumentSuccessAction extends Action {
  meta: { instrumentId: Instrument['id'] };
  type: typeof actionTypes.REMOVE_INSTRUMENT_SUCCESS;
}

/**
 * Remove Payment Tokens Actions.
 */
export type RemovePaymentTokensAction =
  | RemovePaymentTokensFailureAction
  | RemovePaymentTokensRequestAction
  | RemovePaymentTokensSuccessAction;

export interface RemovePaymentTokensFailureAction extends Action {
  payload: { error: Error };
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
 * Update Instrument Actions.
 */
export type UpdateInstrumentAction =
  | UpdateInstrumentFailureAction
  | UpdateInstrumentRequestAction
  | UpdateInstrumentSuccessAction;

export interface UpdateInstrumentFailureAction extends Action {
  payload: { error: Error };
  type: typeof actionTypes.UPDATE_INSTRUMENT_FAILURE;
}

export interface UpdateInstrumentRequestAction extends Action {
  type: typeof actionTypes.UPDATE_INSTRUMENT_REQUEST;
}

export interface UpdateInstrumentSuccessAction extends Action {
  type: typeof actionTypes.UPDATE_INSTRUMENT_SUCCESS;
}

/**
 * Reset Charges Actions.
 */
export type ResetChargesAction = ResetChargesSuccessAction;

export interface ResetChargesSuccessAction extends Action {
  type: typeof actionTypes.RESET_CHARGES_STATE;
}

/**
 * Reset Instruments Actions.
 */
export type ResetInstrumentsAction = ResetInstrumentsSuccessAction;

export interface ResetInstrumentsSuccessAction extends Action {
  type: typeof actionTypes.RESET_INSTRUMENTS_STATE;
}
