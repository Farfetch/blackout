import * as actionTypes from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  Instrument,
  Intent,
  PutInstruments,
  PutInstrumentsData,
} from '@farfetch/blackout-client/payments/types';
import type { UpdateInstrumentAction } from '../../types';

/**
 * @param intentId     - Id of the payment Intent.
 * @param instrumentId - Id of the payment Instrument.
 * @param data         - Instrument object.
 * @param config       - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for updating an instrument.
 *
 * @param putInstruments - Put instruments client.
 *
 * @returns Thunk factory.
 */
const updateInstrumentsFactory =
  (putInstruments: PutInstruments) =>
  (
    intentId: Intent['id'],
    instrumentId: Instrument['id'],
    data: PutInstrumentsData,
    config?: Config,
  ) =>
  async (dispatch: Dispatch<UpdateInstrumentAction>): Promise<void> => {
    try {
      dispatch({
        type: actionTypes.UPDATE_INSTRUMENT_REQUEST,
      });

      const result = await putInstruments(intentId, instrumentId, data, config);

      dispatch({
        type: actionTypes.UPDATE_INSTRUMENT_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: actionTypes.UPDATE_INSTRUMENT_FAILURE,
      });

      throw error;
    }
  };

export default updateInstrumentsFactory;
