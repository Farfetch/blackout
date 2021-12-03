import {
  FETCH_CREDIT_FAILURE,
  FETCH_CREDIT_REQUEST,
  FETCH_CREDIT_SUCCESS,
} from '../actionTypes';
import isEmpty from 'lodash/isEmpty';

/**
 * @callback FetchCreditThunkFactory
 * @param {string} id - User identifier.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Create get user credit balance.
 *
 * @function fetchCredit
 * @memberof module:users/actions
 *
 * @param {Function} getCredit - Get credit client.
 *
 * @returns {FetchCreditThunkFactory} Thunk factory.
 */
export default getCredit => (id, config) => async dispatch => {
  const defaultZeroBalanceCredit = {
    currency: null,
    value: 0,
    formattedValue: null,
  };

  dispatch({
    type: FETCH_CREDIT_REQUEST,
  });

  try {
    const result = await getCredit(id, config);
    const credit = isEmpty(result[0]) ? defaultZeroBalanceCredit : result[0];

    dispatch({
      payload: { credit },
      type: FETCH_CREDIT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: FETCH_CREDIT_FAILURE,
    });

    throw error;
  }
};
