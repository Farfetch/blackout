import {
  GET_INSTRUMENTS_FAILURE,
  GET_INSTRUMENTS_REQUEST,
  GET_INSTRUMENTS_SUCCESS,
} from '../actionTypes';
import { normalize } from 'normalizr';
import instrumentSchema from '../../../entities/schemas/instrument';

/**
 * @callback GetInstrumentsThunkFactory
 * @param {string} id - Id of the payment Intent.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Obtains all the intent instruments that will process on demand.
 *
 * @function doGetInstruments
 * @memberof module:payments/actions
 *
 * @param {Function} getIntruments - Get instruments client.
 *
 * @returns {GetInstrumentsThunkFactory} Thunk factory.
 */
export default getIntruments => (id, config) => async dispatch => {
  dispatch({
    type: GET_INSTRUMENTS_REQUEST,
  });

  try {
    const result = await getIntruments(id, config);

    dispatch({
      payload: normalize(result, [instrumentSchema]),
      type: GET_INSTRUMENTS_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: GET_INSTRUMENTS_FAILURE,
    });

    throw error;
  }
};
