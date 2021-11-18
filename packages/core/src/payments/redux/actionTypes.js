/**
 * @module payments/actionTypes
 * @category Payments
 * @subcategory Actions
 */

/** Action type dispatched when the delete instrument request fails. */
export const DELETE_INSTRUMENT_FAILURE =
  '@farfetch/blackout-core/DELETE_INSTRUMENT_FAILURE';
/** Action type dispatched when the delete instrument request starts. */
export const DELETE_INSTRUMENT_REQUEST =
  '@farfetch/blackout-core/DELETE_INSTRUMENT_REQUEST';
/** Action type dispatched when the delete instrument request succeeds. */
export const DELETE_INSTRUMENT_SUCCESS =
  '@farfetch/blackout-core/DELETE_INSTRUMENT_SUCCESS';

/** Action type dispatched when the delete payment token request fails. */
export const DELETE_PAYMENT_TOKEN_FAILURE =
  '@farfetch/blackout-core/DELETE_PAYMENT_TOKEN_FAILURE';
/** Action type dispatched when the delete payment token request starts. */
export const DELETE_PAYMENT_TOKEN_REQUEST =
  '@farfetch/blackout-core/DELETE_PAYMENT_TOKEN_REQUEST';
/** Action type dispatched when the delete payment token request succeeds. */
export const DELETE_PAYMENT_TOKEN_SUCCESS =
  '@farfetch/blackout-core/DELETE_PAYMENT_TOKEN_SUCCESS';

/** Action type dispatched when the get charges request fails. */
export const GET_CHARGES_FAILURE =
  '@farfetch/blackout-core/GET_CHARGES_FAILURE';
/** Action type dispatched when the get charges request starts. */
export const GET_CHARGES_REQUEST =
  '@farfetch/blackout-core/GET_CHARGES_REQUEST';
/** Action type dispatched when the get charges request succeeds. */
export const GET_CHARGES_SUCCESS =
  '@farfetch/blackout-core/GET_CHARGES_SUCCESS';

/** Action type dispatched when the get instrument request fails. */
export const GET_INSTRUMENT_FAILURE =
  '@farfetch/blackout-core/GET_INSTRUMENT_FAILURE';
/** Action type dispatched when the get instrument request starts. */
export const GET_INSTRUMENT_REQUEST =
  '@farfetch/blackout-core/GET_INSTRUMENT_REQUEST';
/** Action type dispatched when the get instrument request succeeds. */
export const GET_INSTRUMENT_SUCCESS =
  '@farfetch/blackout-core/GET_INSTRUMENT_SUCCESS';

/** Action type dispatched when the get instruments request fails. */
export const GET_INSTRUMENTS_FAILURE =
  '@farfetch/blackout-core/GET_INSTRUMENTS_FAILURE';
/** Action type dispatched when the get instruments request starts. */
export const GET_INSTRUMENTS_REQUEST =
  '@farfetch/blackout-core/GET_INSTRUMENTS_REQUEST';
/** Action type dispatched when the get instruments request succeeds. */
export const GET_INSTRUMENTS_SUCCESS =
  '@farfetch/blackout-core/GET_INSTRUMENTS_SUCCESS';

/** Action type dispatched when the get intent request fails. */
export const GET_INTENT_FAILURE = '@farfetch/blackout-core/GET_INTENT_FAILURE';
/** Action type dispatched when the get intent request starts. */
export const GET_INTENT_REQUEST = '@farfetch/blackout-core/GET_INTENT_REQUEST';
/** Action type dispatched when the get intent request succeeds. */
export const GET_INTENT_SUCCESS = '@farfetch/blackout-core/GET_INTENT_SUCCESS';

/** Action type dispatched when the get payment methods request fails. */
export const GET_PAYMENT_METHODS_FAILURE =
  '@farfetch/blackout-core/GET_PAYMENT_METHODS_FAILURE';
/** Action type dispatched when the get payment methods request starts. */
export const GET_PAYMENT_METHODS_REQUEST =
  '@farfetch/blackout-core/GET_PAYMENT_METHODS_REQUEST';
/** Action type dispatched when the get payment methods request succeeds. */
export const GET_PAYMENT_METHODS_SUCCESS =
  '@farfetch/blackout-core/GET_PAYMENT_METHODS_SUCCESS';

/** Action type dispatched when the get payment tokens request fails. */
export const GET_PAYMENT_TOKENS_FAILURE =
  '@farfetch/blackout-core/GET_PAYMENT_TOKENS_FAILURE';
/** Action type dispatched when the get payment tokens request starts. */
export const GET_PAYMENT_TOKENS_REQUEST =
  '@farfetch/blackout-core/GET_PAYMENT_TOKENS_REQUEST';
/** Action type dispatched when the get payment tokens request succeeds. */
export const GET_PAYMENT_TOKENS_SUCCESS =
  '@farfetch/blackout-core/GET_PAYMENT_TOKENS_SUCCESS';

/** Action type dispatched when the get payment methods by country and currency request fails. */
export const GET_PAYMENT_METHODS_BY_COUNTRY_AND_CURRENCY_FAILURE =
  '@farfetch/blackout-core/GET_PAYMENT_METHODS_BY_COUNTRY_AND_CURRENCY_FAILURE';
/** Action type dispatched when the get payment methods by country and currency request starts. */
export const GET_PAYMENT_METHODS_BY_COUNTRY_AND_CURRENCY_REQUEST =
  '@farfetch/blackout-core/GET_PAYMENT_METHODS_BY_COUNTRY_AND_CURRENCY_REQUEST';
/** Action type dispatched when the get payment methods by country and currency request succeeds. */
export const GET_PAYMENT_METHODS_BY_COUNTRY_AND_CURRENCY_SUCCESS =
  '@farfetch/blackout-core/GET_PAYMENT_METHODS_BY_COUNTRY_AND_CURRENCY_SUCCESS';

/** Action type dispatched when the get payment methods by intent fails. */
export const GET_PAYMENT_METHODS_BY_INTENT_FAILURE =
  '@farfetch/blackout-core/GET_PAYMENT_METHODS_BY_INTENT_FAILURE';
/** Action type dispatched when the get payment methods by intent starts. */
export const GET_PAYMENT_METHODS_BY_INTENT_REQUEST =
  '@farfetch/blackout-core/GET_PAYMENT_METHODS_BY_INTENT_REQUEST';
/** Action type dispatched when the get payment methods by intent succeeds. */
export const GET_PAYMENT_METHODS_BY_INTENT_SUCCESS =
  '@farfetch/blackout-core/GET_PAYMENT_METHODS_BY_INTENT_SUCCESS';

/** Action type dispatched when the get transaction request fails. */
export const GET_TRANSACTION_FAILURE =
  '@farfetch/blackout-core/GET_TRANSACTION_FAILURE';
/** Action type dispatched when the get transaction request starts. */
export const GET_TRANSACTION_REQUEST =
  '@farfetch/blackout-core/GET_TRANSACTION_REQUEST';
/** Action type dispatched when the get transaction request succeeds. */
export const GET_TRANSACTION_SUCCESS =
  '@farfetch/blackout-core/GET_TRANSACTION_SUCCESS';

/** Action type dispatched when the post charges request fails. */
export const POST_CHARGES_FAILURE =
  '@farfetch/blackout-core/POST_CHARGES_FAILURE';
/** Action type dispatched when the post charges request starts. */
export const POST_CHARGES_REQUEST =
  '@farfetch/blackout-core/POST_CHARGES_REQUEST';
/** Action type dispatched when the post charges request succeeds. */
export const POST_CHARGES_SUCCESS =
  '@farfetch/blackout-core/POST_CHARGES_SUCCESS';

/** Action type dispatched when the post credit balance request fails. */
export const POST_CREDIT_BALANCE_FAILURE =
  '@farfetch/blackout-core/POST_CREDIT_BALANCE_FAILURE';
/** Action type dispatched when the post credit balance request starts. */
export const POST_CREDIT_BALANCE_REQUEST =
  '@farfetch/blackout-core/POST_CREDIT_BALANCE_REQUEST';
/** Action type dispatched when the post credit balance request succeeds. */
export const POST_CREDIT_BALANCE_SUCCESS =
  '@farfetch/blackout-core/POST_CREDIT_BALANCE_SUCCESS';

/** Action type dispatched when the post gift card balance request fails. */
export const POST_GIFT_CARD_BALANCE_FAILURE =
  '@farfetch/blackout-core/POST_GIFT_CARD_BALANCE_FAILURE';
/** Action type dispatched when the post gift card balance request starts. */
export const POST_GIFT_CARD_BALANCE_REQUEST =
  '@farfetch/blackout-core/POST_GIFT_CARD_BALANCE_REQUEST';
/** Action type dispatched when the post gift card balance request succeeds. */
export const POST_GIFT_CARD_BALANCE_SUCCESS =
  '@farfetch/blackout-core/POST_GIFT_CARD_BALANCE_SUCCESS';

/** Action type dispatched when the post instrument request fails. */
export const POST_INSTRUMENT_FAILURE =
  '@farfetch/blackout-core/POST_INSTRUMENT_FAILURE';
/** Action type dispatched when the post instrument request starts. */
export const POST_INSTRUMENT_REQUEST =
  '@farfetch/blackout-core/POST_INSTRUMENT_REQUEST';
/** Action type dispatched when the post instrument request succeeds. */
export const POST_INSTRUMENT_SUCCESS =
  '@farfetch/blackout-core/POST_INSTRUMENT_SUCCESS';

/** Action type dispatched when the post payments request fails. */
export const POST_PAYMENTS_FAILURE =
  '@farfetch/blackout-core/POST_PAYMENTS_FAILURE';
/** Action type dispatched when the post payments request starts. */
export const POST_PAYMENTS_REQUEST =
  '@farfetch/blackout-core/POST_PAYMENTS_REQUEST';
/** Action type dispatched when the post payments request succeeds. */
export const POST_PAYMENTS_SUCCESS =
  '@farfetch/blackout-core/POST_PAYMENTS_SUCCESS';

/** Action type dispatched when the post transaction request fails. */
export const POST_TRANSACTION_FAILURE =
  '@farfetch/blackout-core/POST_TRANSACTION_FAILURE';
/** Action type dispatched when the post transaction request starts. */
export const POST_TRANSACTION_REQUEST =
  '@farfetch/blackout-core/POST_TRANSACTION_REQUEST';
/** Action type dispatched when the post transaction request succeeds. */
export const POST_TRANSACTION_SUCCESS =
  '@farfetch/blackout-core/POST_TRANSACTION_SUCCESS';

/** Action type dispatched when the put instrument request fails. */
export const PUT_INSTRUMENT_FAILURE =
  '@farfetch/blackout-core/PUT_INSTRUMENT_FAILURE';
/** Action type dispatched when the put instrument request starts. */
export const PUT_INSTRUMENT_REQUEST =
  '@farfetch/blackout-core/PUT_INSTRUMENT_REQUEST';
/** Action type dispatched when the put instrument request succeeds. */
export const PUT_INSTRUMENT_SUCCESS =
  '@farfetch/blackout-core/PUT_INSTRUMENT_SUCCESS';

/** Action type dispatched when reseting the charges. */
export const RESET_CHARGES = '@farfetch/blackout-core/RESET_CHARGES';
/** Action type dispatched when reseting the instruments. */
export const RESET_INSTRUMENTS = '@farfetch/blackout-core/RESET_INSTRUMENTS';
