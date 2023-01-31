import {
  UPDATE_GIFT_MESSAGE_FAILURE,
  UPDATE_GIFT_MESSAGE_REQUEST,
  UPDATE_GIFT_MESSAGE_SUCCESS,
} from '../actionTypes';

/**
 * @callback UpdateGiftMessageThunkFactory
 * @param {string} id - Universal identifier of the Checkout.
 * @param {Array} data - Array of objects containing the checkout order id and
 * the checkout item patch document reflecting the changes to be made.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for adding, editing and removing gift
 * messages to the current checkout order.
 *
 * @function doUpdateGiftMessage
 * @memberof module:checkout/actions
 *
 * @param {Function} patchGiftMessage - Patch gift message client.
 *
 * @returns {UpdateGiftMessageThunkFactory} Thunk factory.
 */
export default patchGiftMessage => (id, data, config) => async dispatch => {
  dispatch({
    type: UPDATE_GIFT_MESSAGE_REQUEST,
  });

  try {
    await patchGiftMessage(id, data, config);

    dispatch({
      type: UPDATE_GIFT_MESSAGE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: UPDATE_GIFT_MESSAGE_FAILURE,
    });

    throw error;
  }
};
