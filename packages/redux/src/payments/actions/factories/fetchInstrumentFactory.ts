import * as actionTypes from '../../actionTypes';
import { Config, toBlackoutError } from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import instrumentSchema from '../../../entities/schemas/instrument';
import type { Dispatch } from 'redux';
import type { FetchInstrumentAction } from '../../types';
import type {
  GetInstrument,
  Instrument,
  Intent,
} from '@farfetch/blackout-client/payments/types';

/**
 * @param intentId     - Id of the payment Intent.
 * @param instrumentId - Id of the payment Instrument.
 * @param config       - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Action responsible for fetching an instrument.
 *
 * @param getInstrument - Get instrument client.
 *
 * @returns Thunk factory.
 */
const fetchInstrumentFactory =
  (getInstrument: GetInstrument) =>
  (intentId: Intent['id'], instrumentId: Instrument['id'], config?: Config) =>
  async (dispatch: Dispatch<FetchInstrumentAction>): Promise<Instrument> => {
    try {
      dispatch({
        type: actionTypes.FETCH_INSTRUMENT_REQUEST,
      });

      const result = await getInstrument(intentId, instrumentId, config);

      dispatch({
        payload: normalize(result, instrumentSchema),
        type: actionTypes.FETCH_INSTRUMENT_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_INSTRUMENT_FAILURE,
      });

      throw error;
    }
  };

export default fetchInstrumentFactory;
