import {
  getCharges,
  getCreditBalance,
  getGiftCardBalance,
  getIntent,
  getPaymentMethods,
  getInstruments as getReducerInstruments,
  getTokens,
} from './reducer';
import { getEntities, getEntityById } from '../entities/selectors';
import type {
  InstrumentEntity,
  InstrumentsEntity,
  PaymentTokenEntity,
  PaymentTokensEntity,
} from '../entities/types';
import type { State } from './types';
import type { StoreState } from '../types';

/**
 * Returns the payment tokens.
 *
 * @param state - Application state.
 *
 * @returns Payment tokens object.
 */
export const getPaymentTokens = (state: StoreState): PaymentTokensEntity =>
  getEntities(state, 'paymentTokens');

/**
 * Returns the payment token associated with the id.
 *
 * @param state          - Application state.
 * @param paymentTokenId - Payment token id.
 *
 * @returns - Payment token object.
 */
export const getPaymentToken = (
  state: StoreState,
  paymentTokenId: PaymentTokenEntity['id'],
): PaymentTokenEntity | undefined =>
  getEntityById(state, 'paymentTokens', paymentTokenId);

/**
 * Returns the payment tokens error.
 *
 * @param state - Application state.
 *
 * @returns - Payment tokens error.
 */
export const getPaymentTokensError = (
  state: StoreState,
): State['tokens']['error'] => getTokens(state.payments).error;

/**
 * Returns the result of the payment tokens.
 *
 * @param state - Application state.
 *
 * @returns - Array of payment token ids.
 */
export const getPaymentTokensResult = (
  state: StoreState,
): State['tokens']['result'] => getTokens(state.payments).result;

/**
 * Returns the loading status for the payment tokens.
 *
 * @param state - Application state.
 *
 * @returns - Loading status.
 */
export const isPaymentTokensLoading = (
  state: StoreState,
): State['tokens']['isLoading'] => getTokens(state.payments).isLoading;

/**
 * Returns the instruments entity.
 *
 * @param state - Application state.
 *
 * @returns Instruments object.
 */
export const getInstruments = (state: StoreState): InstrumentsEntity =>
  getEntities(state, 'instruments');

/**
 * Returns the payment instrument with the specified id.
 *
 * @param state        - Application state.
 * @param instrumentId - Instrument identifier to get.
 *
 * @returns - Payment instrument object.
 */
export const getInstrument = (
  state: StoreState,
  instrumentId: InstrumentEntity['id'],
): InstrumentEntity | undefined =>
  getEntityById(state, 'instruments', instrumentId);

/**
 * Returns the loading status of the instruments.
 *
 * @param state - Application state.
 *
 * @returns - Instruments loading status.
 */
export const isInstrumentsLoading = (
  state: StoreState,
): State['instruments']['isLoading'] =>
  getReducerInstruments(state.payments).isLoading;

/**
 * Returns the instruments error.
 *
 * @param state - Application state.
 *
 * @returns - Instruments error.
 */
export const getInstrumentsError = (
  state: StoreState,
): State['instruments']['error'] => getReducerInstruments(state.payments).error;

/**
 * Returns the result of instruments operation.
 *
 * @param state - Application state.
 *
 * @returns Instruments operation result.
 */
export const getInstrumentsResult = (
  state: StoreState,
): State['instruments']['result'] =>
  getReducerInstruments(state.payments).result;

/**
 * Returns the loading status for the gift card balance operation.
 *
 * @param state - Application state.
 *
 * @returns Gift card balance Loading status.
 */
export const isGiftCardBalanceLoading = (
  state: StoreState,
): State['giftCardBalance']['isLoading'] =>
  getGiftCardBalance(state.payments).isLoading;

/**
 * Returns the error for the gift card balance operation.
 *
 * @param state - Application state.
 *
 * @returns Gift card balance operation error.
 */
export const getGiftCardBalanceError = (
  state: StoreState,
): State['giftCardBalance']['error'] =>
  getGiftCardBalance(state.payments).error;

/**
 * Returns the result of gift card balance operation.
 *
 * @param state - Application state.
 *
 * @returns Gift card balance operation result.
 */
export const getGiftCardBalanceResult = (
  state: StoreState,
): State['giftCardBalance']['result'] =>
  getGiftCardBalance(state.payments).result;

/**
 * Returns the loading status for the credit balance operation.
 *
 * @param state - Application state.
 *
 * @returns Credit balance Loading status.
 */
export const isCreditBalanceLoading = (
  state: StoreState,
): State['creditBalance']['isLoading'] =>
  getCreditBalance(state.payments).isLoading;

/**
 * Returns the error for the credit balance operation.
 *
 * @param state - Application state.
 *
 * @returns Credit balance operation error.
 */
export const getCreditBalanceError = (
  state: StoreState,
): State['creditBalance']['error'] => getCreditBalance(state.payments).error;

/**
 * Returns the result of credit balance operation.
 *
 * @param state - Application state.
 *
 * @returns Credit balance operation result.
 */
export const getCreditBalanceResult = (
  state: StoreState,
): State['creditBalance']['result'] => getCreditBalance(state.payments).result;

/**
 * Returns the loading status for the intent operation.
 *
 * @param state - Application state.
 *
 * @returns Intent Loading status.
 */
export const isIntentLoading = (
  state: StoreState,
): State['intent']['isLoading'] => getIntent(state.payments).isLoading;

/**
 * Returns the error for the intent operation.
 *
 * @param state - Application state.
 *
 * @returns Intent operation error.
 */
export const getIntentError = (state: StoreState): State['intent']['error'] =>
  getIntent(state.payments).error;

/**
 * Returns the result of the intent operation.
 *
 * @param state - Application state.
 *
 * @returns Intent operation result.
 */
export const getIntentResult = (state: StoreState): State['intent']['result'] =>
  getIntent(state.payments).result;

/**
 * Returns the loading status for the charges operation.
 *
 * @param state - Application state.
 *
 * @returns Charges Loading status.
 */
export const isChargesLoading = (
  state: StoreState,
): State['charges']['isLoading'] => getCharges(state.payments).isLoading;

/**
 * Returns the error for the charges operation.
 *
 * @param state - Application state.
 *
 * @returns Charges operation error.
 */
export const getChargesError = (state: StoreState): State['charges']['error'] =>
  getCharges(state.payments).error;

/**
 * Returns the result of the charges operation.
 *
 * @param state - Application state.
 *
 * @returns Charges operation result.
 */
export const getChargesResult = (
  state: StoreState,
): State['charges']['result'] => getCharges(state.payments).result;

/**
 * Returns the loading status for the payment methods operation.
 *
 * @param state - Application state.
 *
 * @returns PaymentMethods Loading status.
 */
export const isPaymentMethodsLoading = (
  state: StoreState,
): State['paymentMethods']['isLoading'] =>
  getPaymentMethods(state.payments).isLoading;

/**
 * Returns the error for the payment methods operation.
 *
 * @param state - Application state.
 *
 * @returns PaymentMethods operation error.
 */
export const getPaymentMethodsError = (
  state: StoreState,
): State['paymentMethods']['error'] => getPaymentMethods(state.payments).error;

/**
 * Returns the result of the payment methods operation.
 *
 * @param state - Application state.
 *
 * @returns PaymentMethods operation result.
 */
export const getPaymentMethodsResult = (
  state: StoreState,
): State['paymentMethods']['result'] =>
  getPaymentMethods(state.payments).result;