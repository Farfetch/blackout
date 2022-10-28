import { getEntities, getEntityById } from '../entities/selectors';
import {
  getGiftCardBalance,
  getPaymentIntent,
  getPaymentIntentCharge,
  getPaymentIntentInstruments as getPaymentIntentInstrumentsReducer,
  getPaymentMethods,
  getPaymentTokens as getPaymentTokensReducer,
  getUserCreditBalance,
} from './reducer';
import type {
  PaymentInstrumentEntity,
  PaymentTokenEntity,
} from '../entities/types';
import type { PaymentsState } from './types';
import type { StoreState } from '../types';

/**
 * Returns the payment tokens.
 *
 * @param state - Application state.
 *
 * @returns Payment tokens object.
 */
export const getPaymentTokens = (state: StoreState) =>
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
) => getEntityById(state, 'paymentTokens', paymentTokenId);

/**
 * Returns the payment tokens error.
 *
 * @param state - Application state.
 *
 * @returns - Payment tokens error.
 */
export const getPaymentTokensError = (state: StoreState) =>
  getPaymentTokensReducer(state.payments as PaymentsState).error;

/**
 * Returns the result of the payment tokens.
 *
 * @param state - Application state.
 *
 * @returns - Array of payment token ids.
 */
export const getPaymentTokensResult = (state: StoreState) =>
  getPaymentTokensReducer(state.payments as PaymentsState).result;

/**
 * Returns the loading status for the payment tokens.
 *
 * @param state - Application state.
 *
 * @returns - Loading status.
 */
export const arePaymentTokensLoading = (state: StoreState) =>
  getPaymentTokensReducer(state.payments as PaymentsState).isLoading;

/**
 * Returns the fetched status for the payment tokens.
 *
 * @param state - Application state.
 *
 * @returns - Fetched status.
 */
export const arePaymentTokensFetched = (state: StoreState) =>
  (getPaymentTokensResult(state) !== null ||
    getPaymentTokensError(state) !== null) &&
  !arePaymentTokensLoading(state);

/**
 * Returns the payment instruments entities mapped from the current
 * fetch result.
 *
 * @param state - Application state.
 *
 * @returns Payment instruments object.
 */
export const getPaymentIntentInstruments = (state: StoreState) => {
  const result = getPaymentIntentInstrumentsResult(state);

  return result
    ?.map(paymentIntentInstrumentId =>
      getEntityById(state, 'paymentInstruments', paymentIntentInstrumentId),
    )
    .filter(Boolean) as PaymentInstrumentEntity[] | undefined;
};

/**
 * Returns the payment instrument with the specified id.
 *
 * @param state               - Application state.
 * @param paymentInstrumentId - Instrument identifier to get.
 *
 * @returns - Payment instrument object.
 */
export const getPaymentIntentInstrument = (
  state: StoreState,
  paymentInstrumentId: PaymentInstrumentEntity['id'],
) => getEntityById(state, 'paymentInstruments', paymentInstrumentId);

/**
 * Returns the loading status of the payment instruments.
 *
 * @param state - Application state.
 *
 * @returns -Payment intent instruments loading status.
 */
export const arePaymentIntentInstrumentsLoading = (state: StoreState) =>
  getPaymentIntentInstrumentsReducer(state.payments as PaymentsState).isLoading;

/**
 * Returns the payment instruments error.
 *
 * @param state - Application state.
 *
 * @returns - Payment instruments error.
 */
export const getPaymentIntentInstrumentsError = (state: StoreState) =>
  getPaymentIntentInstrumentsReducer(state.payments as PaymentsState).error;

/**
 * Returns the fetched status of the payment intent instruments.
 *
 * @param state - Application state.
 *
 * @returns - Payment intent instruments fetched status.
 */
export const arePaymentIntentInstrumentsFetched = (state: StoreState) =>
  (!!getPaymentIntentInstrumentsResult(state) ||
    !!getPaymentIntentInstrumentsError(state)) &&
  !arePaymentIntentInstrumentsLoading(state);
/**
 * Returns the result of payment instruments operation.
 *
 * @param state - Application state.
 *
 * @returns Payment instruments operation result.
 */
export const getPaymentIntentInstrumentsResult = (state: StoreState) =>
  getPaymentIntentInstrumentsReducer(state.payments as PaymentsState).result;

/**
 * Returns the loading status for the gift card balance operation.
 *
 * @param state - Application state.
 *
 * @returns Gift card balance Loading status.
 */
export const isGiftCardBalanceLoading = (state: StoreState) =>
  getGiftCardBalance(state.payments as PaymentsState).isLoading;

/**
 * Returns the error for the gift card balance operation.
 *
 * @param state - Application state.
 *
 * @returns Gift card balance operation error.
 */
export const getGiftCardBalanceError = (state: StoreState) =>
  getGiftCardBalance(state.payments as PaymentsState).error;

/**
 * Returns the result of gift card balance operation.
 *
 * @param state - Application state.
 *
 * @returns Gift card balance operation result.
 */
export const getGiftCardBalanceResult = (state: StoreState) =>
  getGiftCardBalance(state.payments as PaymentsState).result;

/**
 * Returns the loading status for the user credit balance operation.
 *
 * @param state - Application state.
 *
 * @returns User credit balance loading status.
 */
export const isUserCreditBalanceLoading = (state: StoreState) =>
  getUserCreditBalance(state.payments as PaymentsState).isLoading;

/**
 * Returns the error for the user credit balance operation.
 *
 * @param state - Application state.
 *
 * @returns User credit balance operation error.
 */
export const getUserCreditBalanceError = (state: StoreState) =>
  getUserCreditBalance(state.payments as PaymentsState).error;

/**
 * Returns the result of user credit balance operation.
 *
 * @param state - Application state.
 *
 * @returns User credit balance operation result.
 */
export const getUserCreditBalanceResult = (state: StoreState) =>
  getUserCreditBalance(state.payments as PaymentsState).result;

/**
 * Returns the loading status for the payment intent operation.
 *
 * @param state - Application state.
 *
 * @returns Payment intent Loading status.
 */
export const isPaymentIntentLoading = (state: StoreState) =>
  getPaymentIntent(state.payments as PaymentsState).isLoading;

/**
 * Returns the error for the payment intent operation.
 *
 * @param state - Application state.
 *
 * @returns Payment intent operation error.
 */
export const getPaymentIntentError = (state: StoreState) =>
  getPaymentIntent(state.payments as PaymentsState).error;

/**
 * Returns the fetched status for the payment intent operation.
 *
 * @param state - Application state.
 *
 * @returns Payment intent fetched status.
 */
export const isPaymentIntentFetched = (state: StoreState) =>
  (!!getPaymentIntentResult(state) || !!getPaymentIntentError(state)) &&
  !isPaymentIntentLoading(state);

/**
 * Returns the result of the payment intent operation.
 *
 * @param state - Application state.
 *
 * @returns Payment intent operation result.
 */
export const getPaymentIntentResult = (state: StoreState) =>
  getPaymentIntent(state.payments as PaymentsState).result;

/**
 * Returns the loading status for the payment intent charge operation.
 *
 * @param state - Application state.
 *
 * @returns Payment intent charge Loading status.
 */
export const isPaymentIntentChargeLoading = (state: StoreState) =>
  getPaymentIntentCharge(state.payments as PaymentsState).isLoading;

/**
 * Returns the error for the payment intent charge operation.
 *
 * @param state - Application state.
 *
 * @returns Payment intent charge operation error.
 */
export const getPaymentIntentChargeError = (state: StoreState) =>
  getPaymentIntentCharge(state.payments as PaymentsState).error;

/**
 * Returns the result of the payment intent charge operation.
 *
 * @param state - Application state.
 *
 * @returns Payment intent charge operation result.
 */
export const getPaymentIntentChargeResult = (state: StoreState) =>
  getPaymentIntentCharge(state.payments as PaymentsState).result;

/**
 * Returns the loading status for the payment methods operation.
 *
 * @param state - Application state.
 *
 * @returns PaymentMethods Loading status.
 */
export const arePaymentMethodsLoading = (state: StoreState) =>
  getPaymentMethods(state.payments as PaymentsState).isLoading;

/**
 * Returns the error for the payment methods operation.
 *
 * @param state - Application state.
 *
 * @returns PaymentMethods operation error.
 */
export const getPaymentMethodsError = (state: StoreState) =>
  getPaymentMethods(state.payments as PaymentsState).error;

/**
 * Returns the result of the payment methods operation.
 *
 * @param state - Application state.
 *
 * @returns PaymentMethods operation result.
 */
export const getPaymentMethodsResult = (state: StoreState) =>
  getPaymentMethods(state.payments as PaymentsState).result;
