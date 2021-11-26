import {
  FETCH_INSTRUMENT_FAILURE,
  FETCH_INSTRUMENT_REQUEST,
  FETCH_INSTRUMENT_SUCCESS,
} from '../../actionTypes';
import { normalize } from 'normalizr';
import instrumentSchema from '../../../entities/schemas/instrument';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type { FetchInstrumentAction } from '../../types';
import type {
  GetInstrument,
  Instrument,
  Intent,
} from '@farfetch/blackout-client/payments/types';

/**
 * @callback FetchInstrumentThunkFactory
 * @param {string} intentId - Id of the payment Intent.
 * @param {string} instrumentId - Id of the payment Instrument.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Action responsible for fetching an instrument.
 *
 * @function fetchInstrumentFactory
 * @memberof module:payments/actions/factories
 *
 * @param {Function} getInstrument - Get instrument client.
 *
 * @returns {FetchInstrumentThunkFactory} Thunk factory.
 */
const fetchInstrumentFactory =
  (getInstrument: GetInstrument) =>
  (intentId: Intent['id'], instrumentId: Instrument['id'], config?: Config) =>
  async (dispatch: Dispatch<FetchInstrumentAction>): Promise<Instrument> => {
    dispatch({
      type: FETCH_INSTRUMENT_REQUEST,
    });

    try {
      const result = await getInstrument(intentId, instrumentId, config);

      dispatch({
        payload: normalize(result, instrumentSchema),
        type: FETCH_INSTRUMENT_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: FETCH_INSTRUMENT_FAILURE,
      });

      throw error;
    }
  };

export default fetchInstrumentFactory;
