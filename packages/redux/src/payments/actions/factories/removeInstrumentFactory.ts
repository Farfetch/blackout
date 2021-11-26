import {
  REMOVE_INSTRUMENT_FAILURE,
  REMOVE_INSTRUMENT_REQUEST,
  REMOVE_INSTRUMENT_SUCCESS,
} from '../../actionTypes';
import type { Config } from '@farfetch/blackout-client/types';
import type {
  DeleteInstrument,
  Instrument,
  Intent,
} from '@farfetch/blackout-client/payments/types';
import type { Dispatch } from 'redux';
import type { RemoveInstrumentAction } from '../../types';

/**
 * @callback RemoveInstrumentThunkFactory
 * @param {string} intentId - Id of the payment Intent.
 * @param {string} instrumentId - Id of the payment Instrument.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Action responsible for deleting an instrument.
 *
 * @function removeInstrumentFactory
 * @memberof module:payments/actions/factories
 *
 * @param {Function} deleteInstrument - Delete instrument client.
 *
 * @returns {RemoveInstrumentThunkFactory} Thunk factory.
 */
const removeInstrumentFactory =
  (deleteInstrument: DeleteInstrument) =>
  (intentId: Intent['id'], instrumentId: Instrument['id'], config?: Config) =>
  async (dispatch: Dispatch<RemoveInstrumentAction>): Promise<void> => {
    dispatch({
      type: REMOVE_INSTRUMENT_REQUEST,
    });

    try {
      const result = await deleteInstrument(intentId, instrumentId, config);

      dispatch({
        meta: { instrumentId },
        type: REMOVE_INSTRUMENT_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: REMOVE_INSTRUMENT_FAILURE,
      });

      throw error;
    }
  };

export default removeInstrumentFactory;
