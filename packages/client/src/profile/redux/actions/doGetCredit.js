import {
  GET_CREDIT_FAILURE,
  GET_CREDIT_REQUEST,
  GET_CREDIT_SUCCESS,
} from '../actionTypes';
import isEmpty from 'lodash/isEmpty';

/**
 * @callback GetCreditThunkFactory
 * @param {string} id - User identifier.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Create get user credit balance.
 *
 * @function doGetCredit
 * @memberof module:profile/actions
 *
 * @param {Function} getCredit - Get credit client.
 *
 * @returns {GetCreditThunkFactory} Thunk factory.
 */
export default getCredit => (id, config) => async dispatch => {
  const defaultZeroBalanceCredit = {
    currency: null,
    value: 0,
    formattedValue: null,
  };

  dispatch({
    type: GET_CREDIT_REQUEST,
  });

  try {
    const result = await getCredit(id, config);
    const credit = isEmpty(result[0]) ? defaultZeroBalanceCredit : result[0];

    dispatch({
      payload: { credit },
      type: GET_CREDIT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: GET_CREDIT_FAILURE,
    });

    throw error;
  }
};
