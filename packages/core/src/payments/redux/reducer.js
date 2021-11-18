/**
 * @module payments/reducer
 * @category Payments
 * @subcategory Reducer
 */
import * as actionTypes from './actionTypes';
import { combineReducers } from 'redux';
import { createReducerWithResult, reducerFactory } from '../../helpers/redux';
import get from 'lodash/get';
import omit from 'lodash/omit';

const INITIAL_STATE = {
  tokens: {
    error: null,
    result: null,
    isLoading: false,
  },
  orderPayments: {
    error: null,
    isLoading: false,
  },
  transaction: {
    error: null,
    isLoading: false,
  },
  instruments: {
    error: null,
    isLoading: false,
    result: null,
  },
  giftCardBalance: {
    error: null,
    isLoading: false,
    result: null,
  },
  creditBalance: {
    error: null,
    isLoading: false,
    result: null,
  },
  intent: {
    error: null,
    isLoading: false,
    result: null,
  },
  charges: {
    error: null,
    isLoading: false,
    result: null,
  },
  paymentMethods: {
    error: null,
    isLoading: false,
    result: null,
  },
};

export const tokens = (state = INITIAL_STATE.tokens, action = {}) => {
  switch (action.type) {
    case actionTypes.GET_PAYMENT_TOKENS_REQUEST:
    case actionTypes.DELETE_PAYMENT_TOKEN_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: INITIAL_STATE.tokens.error,
      };

    case actionTypes.GET_PAYMENT_TOKENS_SUCCESS:
      return {
        ...state,
        result: action.payload.result,
        isLoading: false,
      };

    case actionTypes.DELETE_PAYMENT_TOKEN_SUCCESS:
      return {
        ...state,
        result: state.result.filter(tokenId => tokenId !== action.meta.id),
        isLoading: false,
      };

    case actionTypes.GET_PAYMENT_TOKENS_FAILURE:
    case actionTypes.DELETE_PAYMENT_TOKEN_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      };

    default:
      return state;
  }
};

export const entitiesMapper = {
  [actionTypes.DELETE_PAYMENT_TOKEN_SUCCESS]: (state, action) => {
    const { id } = action.meta;
    const currentPaymentTokens = state.paymentTokens;

    return {
      ...state,
      paymentTokens: omit(currentPaymentTokens, id),
    };
  },
  [actionTypes.DELETE_INSTRUMENT_SUCCESS]: (state, action) => {
    const { instrumentId } = action.meta;
    const currentInstruments = state.instruments;

    return {
      ...state,
      instruments: omit(currentInstruments, instrumentId),
    };
  },
  [actionTypes.RESET_INSTRUMENTS]: state => {
    return {
      ...state,
      instruments: {},
    };
  },
  [actionTypes.POST_PAYMENTS_SUCCESS]: (state, action) => {
    const orderId = action.meta.id;
    const currentOrderPayment = get(state, `orderPayments[${orderId}]`);

    return {
      ...state,
      orderPayments: {
        [orderId]: {
          ...currentOrderPayment,
          ...action.payload.entities,
        },
      },
    };
  },
};

export const orderPayments = reducerFactory(
  'POST_PAYMENTS',
  INITIAL_STATE.orderPayments,
  actionTypes,
);

export const transaction = createReducerWithResult(
  ['GET_TRANSACTION', 'POST_TRANSACTION'],
  INITIAL_STATE.transaction,
  actionTypes,
  true,
);

export const paymentMethods = createReducerWithResult(
  [
    'GET_PAYMENT_METHODS_BY_COUNTRY_AND_CURRENCY',
    'GET_PAYMENT_METHODS_BY_INTENT',
  ],
  INITIAL_STATE.paymentMethods,
  actionTypes,
);

export const instruments = (state = INITIAL_STATE.instruments, action = {}) => {
  switch (action.type) {
    case actionTypes.GET_INSTRUMENT_REQUEST:
    case actionTypes.GET_INSTRUMENTS_REQUEST:
    case actionTypes.POST_INSTRUMENT_REQUEST:
    case actionTypes.PUT_INSTRUMENT_REQUEST:
    case actionTypes.DELETE_INSTRUMENT_REQUEST:
      return {
        error: INITIAL_STATE.instruments.error,
        isLoading: true,
      };
    case actionTypes.GET_INSTRUMENT_FAILURE:
    case actionTypes.GET_INSTRUMENTS_FAILURE:
    case actionTypes.POST_INSTRUMENT_FAILURE:
    case actionTypes.PUT_INSTRUMENT_FAILURE:
    case actionTypes.DELETE_INSTRUMENT_FAILURE:
      return {
        error: action.payload.error,
        isLoading: false,
      };
    case actionTypes.GET_INSTRUMENT_SUCCESS:
    case actionTypes.GET_INSTRUMENTS_SUCCESS:
      return {
        error: INITIAL_STATE.instruments.error,
        isLoading: false,
        result: action.payload.result,
      };
    case actionTypes.POST_INSTRUMENT_SUCCESS:
    case actionTypes.PUT_INSTRUMENT_SUCCESS:
      return {
        error: INITIAL_STATE.instruments.error,
        isLoading: false,
      };
    case actionTypes.DELETE_INSTRUMENT_SUCCESS:
      return {
        error: INITIAL_STATE.tokens.error,
        isLoading: false,
        result:
          state &&
          state.result &&
          state.result.filter(
            instrumentId => instrumentId !== action.meta.instrumentId,
          ),
      };
    case actionTypes.RESET_INSTRUMENTS:
      return INITIAL_STATE.instruments;
    default:
      return state;
  }
};

export const giftCardBalance = createReducerWithResult(
  'POST_GIFT_CARD_BALANCE',
  INITIAL_STATE.giftCardBalance,
  actionTypes,
);

export const creditBalance = createReducerWithResult(
  'POST_CREDIT_BALANCE',
  INITIAL_STATE.creditBalance,
  actionTypes,
);

export const intent = createReducerWithResult(
  'GET_INTENT',
  INITIAL_STATE.intent,
  actionTypes,
);

export const charges = (state = INITIAL_STATE.charges, action = {}) => {
  switch (action.type) {
    case actionTypes.POST_CHARGES_REQUEST:
    case actionTypes.GET_CHARGES_REQUEST:
      return {
        error: INITIAL_STATE.charges.error,
        isLoading: true,
      };
    case actionTypes.POST_CHARGES_FAILURE:
    case actionTypes.GET_CHARGES_FAILURE:
      return {
        error: action.payload.error,
        isLoading: false,
      };
    case actionTypes.POST_CHARGES_SUCCESS:
    case actionTypes.GET_CHARGES_SUCCESS:
      return {
        error: INITIAL_STATE.charges.error,
        isLoading: false,
        result: {
          ...action.payload,
          chargeId: get(action.meta, 'chargeId'),
        },
      };
    case actionTypes.RESET_CHARGES:
      return INITIAL_STATE.charges;
    default:
      return state;
  }
};

export const getTokens = state => state.tokens;
export const getOrderPayments = state => state.orderPayments;
export const getTransaction = state => state.transaction;
export const getInstruments = state => state.instruments;
export const getGiftCardBalance = state => state.giftCardBalance;
export const getCreditBalance = state => state.creditBalance;
export const getIntent = state => state.intent;
export const getCharges = state => state.charges;
export const getPaymentMethods = state => state.paymentMethods;

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
export default combineReducers({
  tokens,
  orderPayments,
  transaction,
  instruments,
  giftCardBalance,
  creditBalance,
  intent,
  charges,
  paymentMethods,
});
