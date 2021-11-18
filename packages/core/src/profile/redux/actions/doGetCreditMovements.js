import {
  GET_CREDIT_MOVEMENTS_FAILURE,
  GET_CREDIT_MOVEMENTS_REQUEST,
  GET_CREDIT_MOVEMENTS_SUCCESS,
} from '../actionTypes';

/**
 * @typedef {object} GetCreditMovementsQuery
 * @property {string} [from] - Get movements created after the
 * specified ISO 8601 moment. For example, 2017-07-01T00:00:00.
 * @property {string} [to] - Get movements created before the specified
 * ISO 8601 moment. For example, 2017-07-31T23:59:59.
 * @property {number} [page=1] - Number of the page to get, starting at 1.
 * The default is 1.
 * @property {number} [pageSize=10000] - Size of each page, as a number.
 * The default is 10000.
 */

/**
 * @callback GetCreditMovementsThunkFactory
 * @param {string} id - User identifier.
 * @param {GetCreditMovementsQuery} [query] - Query parameters.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Create get user credit movements.
 *
 * @function doGetCreditMovements
 * @memberof module:profile/actions
 *
 * @param {Function} getCreditMovements - Get credit movements client.
 *
 * @returns {GetCreditMovementsThunkFactory} Thunk factory.
 */
export default getCreditMovements => (id, query, config) => async dispatch => {
  dispatch({
    type: GET_CREDIT_MOVEMENTS_REQUEST,
  });

  try {
    const result = await getCreditMovements(id, query, config);

    dispatch({
      payload: { creditMovements: result },
      type: GET_CREDIT_MOVEMENTS_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: GET_CREDIT_MOVEMENTS_FAILURE,
    });

    throw error;
  }
};
