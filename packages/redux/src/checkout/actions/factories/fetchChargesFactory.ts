import {
  FETCH_CHARGES_FAILURE,
  FETCH_CHARGES_REQUEST,
  FETCH_CHARGES_SUCCESS,
} from '../../actionTypes';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  GetCharges,
  GetChargesResponse,
} from '@farfetch/blackout-client/checkout/types';

/**
 * @callback FetchChargesThunkFactory
 * @param {string} id - Numeric identifier of the checkout order.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for getting the order charge.
 *
 * @function fetchChargesFactory
 * @memberof module:checkout/actions/factories
 *
 * @param {Function} getCharges - Get charges client.
 *
 * @returns {FetchChargesThunkFactory} Thunk factory.
 */
const fetchChargesFactory =
  (getCharges: GetCharges) =>
  (id: string, config?: Config) =>
  async (dispatch: Dispatch): Promise<GetChargesResponse> => {
    dispatch({
      type: FETCH_CHARGES_REQUEST,
    });

    try {
      const result = await getCharges(id, config);

      dispatch({
        payload: result,
        type: FETCH_CHARGES_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: FETCH_CHARGES_FAILURE,
      });

      throw error;
    }
  };

export default fetchChargesFactory;
