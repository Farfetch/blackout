import {
  GET_BAG_OPERATION_FAILURE,
  GET_BAG_OPERATION_REQUEST,
  GET_BAG_OPERATION_SUCCESS,
} from '../actionTypes';
import { normalize } from 'normalizr';
import bagOperationSchema from '../../../entities/schemas/bagOperation';

/**
 * @callback GetBagOperationThunkFactory
 * @param {number} bagId - Bag id.
 * @param {string} bagOperationId - Bag operation id.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Load bag operation with given id.
 *
 * @function doGetBagOperation
 * @memberof module:bags/actions
 *
 * @param {Function} getBagOperation - Get bag operation client.
 *
 * @returns {GetBagOperationThunkFactory} Thunk factory.
 */
export default getBagOperation =>
  (bagId, bagOperationId, config) =>
  async dispatch => {
    dispatch({
      type: GET_BAG_OPERATION_REQUEST,
      payload: { bagOperationId },
    });

    try {
      const result = await getBagOperation(bagId, bagOperationId, config);

      dispatch({
        payload: { ...normalize(result, bagOperationSchema), bagOperationId },
        type: GET_BAG_OPERATION_SUCCESS,
      });
    } catch (error) {
      dispatch({
        payload: { error, bagOperationId },
        type: GET_BAG_OPERATION_FAILURE,
      });

      throw error;
    }
  };
