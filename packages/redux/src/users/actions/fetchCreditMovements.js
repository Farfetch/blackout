import {
  FETCH_CREDIT_MOVEMENTS_FAILURE,
  FETCH_CREDIT_MOVEMENTS_REQUEST,
  FETCH_CREDIT_MOVEMENTS_SUCCESS,
} from '../actionTypes';

/**
 * @typedef {object} FetchCreditMovementsQuery
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
 * @callback FetchCreditMovementsThunkFactory
 * @param {string} id - User identifier.
 * @param {FetchCreditMovementsQuery} [query] - Query parameters.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Create get user credit movements.
 *
 * @function fetchCreditMovements
 * @memberof module:users/actions
 *
 * @param {Function} getCreditMovements - Get credit movements client.
 *
 * @returns {FetchCreditMovementsThunkFactory} Thunk factory.
 */
export default getCreditMovements => (id, query, config) => async dispatch => {
  dispatch({
    type: FETCH_CREDIT_MOVEMENTS_REQUEST,
  });

  try {
    const result = await getCreditMovements(id, query, config);

    dispatch({
      payload: { creditMovements: result },
      type: FETCH_CREDIT_MOVEMENTS_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: FETCH_CREDIT_MOVEMENTS_FAILURE,
    });

    throw error;
  }
};
