import {
  GET_INSTRUMENT_FAILURE,
  GET_INSTRUMENT_REQUEST,
  GET_INSTRUMENT_SUCCESS,
} from '../actionTypes';
import { normalize } from 'normalizr';
import instrumentSchema from '../../../entities/schemas/instrument';

/**
 * @callback GetInstrumentThunkFactory
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
 * @function doGetInstrument
 * @memberof module:payments/actions
 *
 * @param {Function} getIntrument - Get instrument client.
 *
 * @returns {GetInstrumentThunkFactory} Thunk factory.
 */
export default getIntrument =>
  (intentId, instrumentId, config) =>
  async dispatch => {
    dispatch({
      type: GET_INSTRUMENT_REQUEST,
    });

    try {
      const result = await getIntrument(intentId, instrumentId, config);

      dispatch({
        payload: normalize(result, instrumentSchema),
        type: GET_INSTRUMENT_SUCCESS,
      });
    } catch (error) {
      dispatch({
        payload: { error },
        type: GET_INSTRUMENT_FAILURE,
      });

      throw error;
    }
  };
