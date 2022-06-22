import * as actionTypes from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { Config } from '@farfetch/blackout-client/types';
import type {
  DeleteInstrument,
  Instrument,
  Intent,
} from '@farfetch/blackout-client/payments/types';
import type { Dispatch } from 'redux';
import type { RemoveInstrumentAction } from '../../types';

/**
 * @param intentId     - Id of the payment Intent.
 * @param instrumentId - Id of the payment Instrument.
 * @param config       - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Action responsible for deleting an instrument.
 *
 * @param deleteInstrument - Delete instrument client.
 *
 * @returns Thunk factory.
 */
const removeInstrumentFactory =
  (deleteInstrument: DeleteInstrument) =>
  (intentId: Intent['id'], instrumentId: Instrument['id'], config?: Config) =>
  async (dispatch: Dispatch<RemoveInstrumentAction>): Promise<void> => {
    try {
      dispatch({
        type: actionTypes.REMOVE_INSTRUMENT_REQUEST,
      });

      const result = await deleteInstrument(intentId, instrumentId, config);

      dispatch({
        meta: { instrumentId },
        type: actionTypes.REMOVE_INSTRUMENT_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: actionTypes.REMOVE_INSTRUMENT_FAILURE,
      });

      throw error;
    }
  };

export default removeInstrumentFactory;
