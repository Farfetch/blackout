import { adaptTimestamp } from '../../../helpers/adapters';
import {
  UPDATE_RETURN_FAILURE,
  UPDATE_RETURN_REQUEST,
  UPDATE_RETURN_SUCCESS,
} from '../actionTypes';

/**
 * @typedef {object} UpdateReturnData
 * @property {object} [start] - The date of the start of the return slot.
 * The value should be a timestamp.
 * @property {object} [end] - The date of the end of the return slot.
 * The value should be a timestamp.
 */

/**
 * @typedef {object} UpdateReturnQuery
 * @property {string} [guestOrderId] - Order identifier. Only required if
 * the user is not registered (guest).
 * @property {string} [guestUserEmail] - User email. Only required if
 * the user is not registered (guest).
 */

/**
 * @callback UpdateReturnThunkFactory
 * @param {string} id - Return identifier.
 * @param {UpdateReturnData} data - Details of the return to be updated.
 * @param {UpdateReturnQuery} query - Query parameters for updating the return.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for updating the pickup schedule of a return.
 *
 * @function doUpdateReturn
 * @memberof module:returns/actions
 *
 * @param {Function} patchReturn - Patch return client.
 *
 * @returns {UpdateReturnThunkFactory} Thunk factory.
 */
export default patchReturn => (id, data, query, config) => async dispatch => {
  dispatch({
    type: UPDATE_RETURN_REQUEST,
  });

  try {
    const adaptedData = {
      start: adaptTimestamp(data.start),
      end: adaptTimestamp(data.end),
    };

    const result = await patchReturn(id, adaptedData, query, config);

    dispatch({
      meta: { id },
      payload: {
        entities: {
          redirectUrl: result.redirectUrl,
        },
      },
      type: UPDATE_RETURN_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: UPDATE_RETURN_FAILURE,
    });

    throw error;
  }
};
