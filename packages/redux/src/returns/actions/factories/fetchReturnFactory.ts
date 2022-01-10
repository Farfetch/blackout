import {
  FETCH_RETURN_FAILURE,
  FETCH_RETURN_REQUEST,
  FETCH_RETURN_SUCCESS,
} from '../../actionTypes';
import { normalize } from 'normalizr';
import returnSchema from '../../../entities/schemas/return';
import type { Dispatch } from 'redux';
import type {
  GetReturn,
  Query,
  Return,
} from '@farfetch/blackout-client/returns/types';

/**
 * @typedef {object} GetReturnQuery
 * @property {string} [guestOrderId] - Order identifier. Only required if
 * the user is not registered (guest).
 * @property {string} [guestUserEmail] - User email. Only required if
 * the user is not registered (guest).
 */

/**
 * @callback FetchReturnThunkFactory
 * @param {number} id - Return identifier.
 * @param {GetReturnQuery} query - Query parameters for retrieving the return.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for obtaining a specific return.
 *
 * @function fetchReturnFactory
 * @memberof module:returns/actions
 *
 * @param {Function} getReturn - Get return client.
 *
 * @returns {FetcbReturnThunkFactory} Thunk factory.
 */
const fetchReturnFactory =
  (getReturn: GetReturn) =>
  (id: number, query?: Query, config?: Record<string, unknown>) =>
  async (dispatch: Dispatch): Promise<Return> => {
    dispatch({
      type: FETCH_RETURN_REQUEST,
    });

    try {
      const result = await getReturn(id, query, config);

      dispatch({
        payload: normalize(result, returnSchema),
        type: FETCH_RETURN_SUCCESS,
      });
      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: FETCH_RETURN_FAILURE,
      });

      throw error;
    }
  };

export default fetchReturnFactory;
