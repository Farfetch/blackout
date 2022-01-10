import { adaptTimestamp } from '@farfetch/blackout-client/helpers/adapters';
import {
  UPDATE_RETURN_FAILURE,
  UPDATE_RETURN_REQUEST,
  UPDATE_RETURN_SUCCESS,
} from '../../actionTypes';
import type { Dispatch } from 'redux';
import type {
  PatchReturn,
  PatchReturnData,
  Query,
  Return,
} from '@farfetch/blackout-client/src/returns/types';

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
 * @param {number} id - Return identifier.
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
 * @function updateReturn
 * @memberof module:returns/actions
 *
 * @param {Function} patchReturn - Patch return client.
 *
 * @returns {UpdateReturnThunkFactory} Thunk factory.
 */
const updateReturnFactory =
  (patchReturn: PatchReturn) =>
  (
    id: number,
    data: PatchReturnData,
    query?: Query,
    config?: Record<string, unknown>,
  ) =>
  async (dispatch: Dispatch): Promise<Return> => {
    dispatch({
      type: UPDATE_RETURN_REQUEST,
    });

    try {
      const adaptedData = {
        start: adaptTimestamp(data.start) || '',
        end: adaptTimestamp(data.end) || '',
      };

      const result = await patchReturn(id, adaptedData, query, config);

      dispatch({
        type: UPDATE_RETURN_SUCCESS,
      });
      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: UPDATE_RETURN_FAILURE,
      });

      throw error;
    }
  };

export default updateReturnFactory;
