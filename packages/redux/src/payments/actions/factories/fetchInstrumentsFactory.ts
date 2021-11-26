import {
  FETCH_INSTRUMENTS_FAILURE,
  FETCH_INSTRUMENTS_REQUEST,
  FETCH_INSTRUMENTS_SUCCESS,
} from '../../actionTypes';
import { normalize } from 'normalizr';
import instrumentSchema from '../../../entities/schemas/instrument';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type { FetchInstrumentsAction } from '../../types';
import type {
  GetInstruments,
  Instruments,
  Intent,
} from '@farfetch/blackout-client/payments/types';

/**
 * @callback FetchInstrumentsThunkFactory
 * @param {string} id - Id of the payment Intent.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Obtains all the intent instruments that will process on demand.
 *
 * @function fetchInstrumentsFactory
 * @memberof module:payments/actions/factories
 *
 * @param {Function} getIntruments - Get instruments client.
 *
 * @returns {FetchInstrumentsThunkFactory} Thunk factory.
 */

const fetchInstrumentsFactory =
  (getIntruments: GetInstruments) =>
  (id: Intent['id'], config?: Config) =>
  async (dispatch: Dispatch<FetchInstrumentsAction>): Promise<Instruments> => {
    dispatch({
      type: FETCH_INSTRUMENTS_REQUEST,
    });

    try {
      const result = await getIntruments(id, config);

      dispatch({
        payload: normalize(result, [instrumentSchema]),
        type: FETCH_INSTRUMENTS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: FETCH_INSTRUMENTS_FAILURE,
      });

      throw error;
    }
  };

export default fetchInstrumentsFactory;
