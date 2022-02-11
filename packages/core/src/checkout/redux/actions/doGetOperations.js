import {
  GET_OPERATIONS_FAILURE,
  GET_OPERATIONS_REQUEST,
  GET_OPERATIONS_SUCCESS,
} from '../actionTypes';

/**
 * @typedef {object} getOperationsQuery
 * @property {number} page - Specify the number of the page to get, starting at 1. The default is 1.
 * @property {number} pageSize - Specify the size of each page, as a number between 1 and 180. The default is 60.
 * @property {Array<string>} sort - Sort by the creation date of the operations. The default is to sort by the most recent.
 *                                  "createdDate:desc" - Start by the most recent.
 *                                  "createdDate:asc" - Start by the oldest.
 * @property {string} createdDate - Filter by the creation date, in RFC 3339 format, using ge and le operators separated by commas (,).
 *                                  (e.g: "createdDate=ge:2019-01-20T10:01:55.883Z,le:2019-01-22T10:01:55.883Z").
 */

/**
 * @callback getOperationsThunkFactory
 * @param {string} id - Universal identifier of the Checkout.
 * @param {getOperationsQuery} query - Query parameters to apply.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for obtaining the checkout.
 *
 * @function doGetOperations
 * @memberof module:checkout/actions
 *
 * @param {Function} getOperations - Get checkout client.
 *
 * @returns {getOperationsThunkFactory} Thunk factory.
 */
export default getOperations => (id, query, config) => async dispatch => {
  dispatch({
    type: GET_OPERATIONS_REQUEST,
  });

  try {
    const result = await getOperations(id, query, config);

    dispatch({
      payload: result,
      type: GET_OPERATIONS_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: GET_OPERATIONS_FAILURE,
    });

    throw error;
  }
};
