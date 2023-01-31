import {
  POST_GIFT_CARD_BALANCE_FAILURE,
  POST_GIFT_CARD_BALANCE_REQUEST,
  POST_GIFT_CARD_BALANCE_SUCCESS,
} from '../actionTypes';

/**
 * @typedef {object} PostGiftCardBalanceData
 * @property {string} giftCardNumber - Gift card number.
 * @property {string} giftCardCsc - Gift card csc.
 */

/**
 * @callback PostGiftCardBalanceThunkFactory
 * @param {PostGiftCardBalanceData} data - Details of the gift card balance.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for getting the gift card balance.
 *
 * @function doPostGiftCardBalance
 * @memberof module:payments/actions
 *
 * @param {Function} postCheckGiftCardBalance - Post check gift card balance
 * client.
 *
 * @returns {PostGiftCardBalanceThunkFactory} Thunk factory.
 */
export default postCheckGiftCardBalance => (data, config) => async dispatch => {
  dispatch({
    type: POST_GIFT_CARD_BALANCE_REQUEST,
  });

  try {
    const result = await postCheckGiftCardBalance(data, config);

    dispatch({
      payload: result,
      type: POST_GIFT_CARD_BALANCE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: POST_GIFT_CARD_BALANCE_FAILURE,
    });

    throw error;
  }
};
