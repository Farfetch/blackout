import {
  GET_OPERATION_FAILURE,
  GET_OPERATION_REQUEST,
  GET_OPERATION_SUCCESS,
} from '../actionTypes';

/**
 * @callback getOperationThunkFactory
 * @param {string} id - Numeric identifier of the checkout order.
 * @param {string} operationId - Numeric identifier of the operation.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for obtaining all the changes that occurred during the operation.
 *
 * @function doGetOperation
 * @memberof module:checkout/actions
 *
 * @param {Function} getOperation - Get checkout client.
 *
 * @returns {getOperationThunkFactory} Thunk factory.
 */
export default getOperation => (id, operationId, config) => async dispatch => {
  dispatch({
    type: GET_OPERATION_REQUEST,
  });

  try {
    const result = await getOperation(id, operationId, config);

    dispatch({
      payload: result,
      type: GET_OPERATION_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: GET_OPERATION_FAILURE,
    });

    throw error;
  }
};
