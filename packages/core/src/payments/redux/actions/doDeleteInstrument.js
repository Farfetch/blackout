import {
  DELETE_INSTRUMENT_FAILURE,
  DELETE_INSTRUMENT_REQUEST,
  DELETE_INSTRUMENT_SUCCESS,
} from '../actionTypes';

/**
 * @callback DeleteInstrumentThunkFactory
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
 * @function doDeleteInstrument
 * @memberof module:payments/actions
 *
 * @param {Function} deleteInstrument - Delete instrument client.
 *
 * @returns {DeleteInstrumentThunkFactory} Thunk factory.
 */
export default deleteInstrument =>
  (intentId, instrumentId, config) =>
  async dispatch => {
    dispatch({
      type: DELETE_INSTRUMENT_REQUEST,
    });

    try {
      await deleteInstrument(intentId, instrumentId, config);

      dispatch({
        meta: { instrumentId },
        type: DELETE_INSTRUMENT_SUCCESS,
      });
    } catch (error) {
      dispatch({
        payload: { error },
        type: DELETE_INSTRUMENT_FAILURE,
      });

      throw error;
    }
  };
