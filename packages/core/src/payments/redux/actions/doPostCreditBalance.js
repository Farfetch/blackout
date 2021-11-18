import {
  POST_CREDIT_BALANCE_FAILURE,
  POST_CREDIT_BALANCE_REQUEST,
  POST_CREDIT_BALANCE_SUCCESS,
} from '../actionTypes';

/**
 * @typedef {object} PostCreditBalanceData
 * @property {string} creditUserId - Identifier of the Credit User.
 */

/**
 * @callback PostCreditBalanceThunkFactory
 * @param {PostCreditBalanceData} data - Details for obtaining credit balance.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for getting the user credit balance.
 *
 * @function doPostCreditBalance
 * @memberof module:payments/actions
 *
 * @param {Function} postCheckCreditBalance - Post check credit balance client.
 *
 * @returns {PostCreditBalanceThunkFactory} Thunk factory.
 */
export default postCheckCreditBalance => (data, config) => async dispatch => {
  dispatch({
    type: POST_CREDIT_BALANCE_REQUEST,
  });

  try {
    const result = await postCheckCreditBalance(data, config);

    dispatch({
      payload: result,
      type: POST_CREDIT_BALANCE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: POST_CREDIT_BALANCE_FAILURE,
    });

    throw error;
  }
};
