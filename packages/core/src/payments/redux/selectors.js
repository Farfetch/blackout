/**
 * @module payments/selectors
 * @category Payments
 * @subcategory Selectors
 */

import {
  getApplePaySession,
  getCharges,
  getCreditBalance,
  getGiftCardBalance,
  getIntent,
  getOrderPayments,
  getPaymentMethods,
  getInstruments as getReducerInstruments,
  getTokens,
  getTransaction,
} from './reducer';
import { getEntity } from '../../entities/redux/selectors';

/**
 * Returns the payment tokens.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Payment tokens object.
 */
export const getPaymentTokens = state => getEntity(state, 'paymentTokens');

/**
 * Returns the payment token associated with the id.
 *
 * @function
 *
 * @param {object} state            - Application state.
 * @param {object} paymentTokenId   - Payment token id.
 *
 * @returns {object}                - Payment token object.
 */
export const getPaymentToken = (state, paymentTokenId) =>
  getEntity(state, 'paymentTokens', paymentTokenId);

/**
 * Returns the payment tokens error.
 *
 * @function
 *
 * @param {object} state    - Application state.
 *
 * @returns {object}        - Payment tokens error.
 */
export const getPaymentTokensError = state => getTokens(state.payments).error;

/**
 * Returns the result of the payment tokens.
 *
 * @function
 *
 * @param {object} state    - Application state.
 *
 * @returns {Array}         - Array of payment token ids.
 */
export const getPaymentTokensResult = state => getTokens(state.payments).result;

/**
 * Returns the loading status for the payment tokens.
 *
 * @function
 *
 * @param {object} state    - Application state.
 *
 * @returns {boolean}       - Loading status.
 */
export const isPaymentTokensLoading = state =>
  getTokens(state.payments).isLoading;

/**
 * Returns the order payments entity.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Order payment object.
 */
export const getOrderPaymentsEntity = state =>
  getEntity(state, 'orderPayments');

/**
 * Returns the loading status for the order payment.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Loading status.
 *
 */
export const isOrderPaymentsLoading = state =>
  getOrderPayments(state.payments).isLoading;

/**
 * Returns the order payment error.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object}     - Payment tokens error.
 *
 */
export const getOrderPaymentsError = state =>
  getOrderPayments(state.payments).error;

/**
 * Returns the payment instrument with the specified id.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} instrumentId - Instrument identifier to get.
 *
 * @returns {object} - Payment instrument object.
 */
export const getInstrument = (state, instrumentId) =>
  getEntity(state, 'instruments', instrumentId);

/**
 * Returns the instruments entity.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Instruments object.
 */
export const getInstruments = state => getEntity(state, 'instruments');

/**
 * Returns the loading status of the instruments.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object}     - Instruments loading status.
 */
export const isInstrumentsLoading = state =>
  getReducerInstruments(state.payments).isLoading;

/**
 * Returns the instruments error.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object}     - Instruments error.
 */
export const getInstrumentsError = state =>
  getReducerInstruments(state.payments).error;

/**
 * Returns the result of instruments operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Instruments operation result.
 */
export const getInstrumentsResult = state =>
  getReducerInstruments(state.payments).result;

/**
 * Returns the loading status for the transaction operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Transaction Loading status.
 */
export const isTransactionLoading = state =>
  getTransaction(state.payments).isLoading;

/**
 * Returns the error for the transaction operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Transaction operation error.
 */
export const getTransactionError = state =>
  getTransaction(state.payments).error;

/**
 * Returns the result of transaction operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Transaction operation result.
 */
export const getTransactionResult = state =>
  getTransaction(state.payments).result;

/**
 * Returns the loading status for the gift card balance operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Gift card balance Loading status.
 */
export const isGiftCardBalanceLoading = state =>
  getGiftCardBalance(state.payments).isLoading;

/**
 * Returns the error for the gift card balance operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Gift card balance operation error.
 */
export const getGiftCardBalanceError = state =>
  getGiftCardBalance(state.payments).error;

/**
 * Returns the result of gift card balance operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Gift card balance operation result.
 */
export const getGiftCardBalanceResult = state =>
  getGiftCardBalance(state.payments).result;

/**
 * Returns the loading status for the credit balance operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Credit balance Loading status.
 */
export const isCreditBalanceLoading = state =>
  getCreditBalance(state.payments).isLoading;

/**
 * Returns the error for the credit balance operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Credit balance operation error.
 */
export const getCreditBalanceError = state =>
  getCreditBalance(state.payments).error;

/**
 * Returns the result of credit balance operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Credit balance operation result.
 */
export const getCreditBalanceResult = state =>
  getCreditBalance(state.payments).result;

/**
 * Returns the loading status for the intent operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Intent Loading status.
 */
export const isIntentLoading = state => getIntent(state.payments).isLoading;

/**
 * Returns the error for the intent operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Intent operation error.
 */
export const getIntentError = state => getIntent(state.payments).error;

/**
 * Returns the result of the intent operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Intent operation result.
 */
export const getIntentResult = state => getIntent(state.payments).result;

/**
 * Returns the loading status for the charges operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Charges Loading status.
 */
export const isChargesLoading = state => getCharges(state.payments).isLoading;

/**
 * Returns the error for the charges operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Charges operation error.
 */
export const getChargesError = state => getCharges(state.payments).error;

/**
 * Returns the result of the charges operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Charges operation result.
 */
export const getChargesResult = state => getCharges(state.payments).result;

/**
 * Returns the loading status for the payment methods operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} PaymentMethods Loading status.
 */
export const isPaymentMethodsLoading = state =>
  getPaymentMethods(state.payments).isLoading;

/**
 * Returns the error for the payment methods operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} PaymentMethods operation error.
 */
export const getPaymentMethodsError = state =>
  getPaymentMethods(state.payments).error;

/**
 * Returns the result of the payment methods operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} PaymentMethods operation result.
 */
export const getPaymentMethodsResult = state =>
  getPaymentMethods(state.payments).result;

/**
 * Returns the loading status for the apple pay session operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Apple pay session Loading status.
 */
export const isApplePaySessionLoading = state =>
  getApplePaySession(state.payments).isLoading;

/**
 * Returns the error for the apple pay session operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Apple pay session operation error.
 */
export const getApplePaySessionError = state =>
  getApplePaySession(state.payments).error;

/**
 * Returns the result of apple pay session operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Apple pay session operation result.
 */
export const getApplePaySessionResult = state =>
  getApplePaySession(state.payments).result;
