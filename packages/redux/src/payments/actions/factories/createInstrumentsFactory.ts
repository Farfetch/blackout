import * as actionTypes from '../../actionTypes';
import { Config, toBlackoutError } from '@farfetch/blackout-client';
import type { CreateInstrumentsAction } from '../../types';
import type { Dispatch } from 'redux';
import type {
  Instrument,
  PostInstruments,
  PostInstrumentsData,
  PostInstrumentsResponse,
} from '@farfetch/blackout-client/payments/types';

/**
 * @param id     - Id of the payment Intent.
 * @param data   - Instrument object.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for creating an instrument.
 *
 * @param postInstruments - Post instruments client.
 *
 * @returns Thunk factory.
 */
const createInstrumentsFactory =
  (postInstruments: PostInstruments) =>
  (id: Instrument['id'], data: PostInstrumentsData, config?: Config) =>
  async (
    dispatch: Dispatch<CreateInstrumentsAction>,
  ): Promise<PostInstrumentsResponse> => {
    try {
      dispatch({
        type: actionTypes.CREATE_INSTRUMENT_REQUEST,
      });

      const result = await postInstruments(id, data, config);

      dispatch({
        type: actionTypes.CREATE_INSTRUMENT_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.CREATE_INSTRUMENT_FAILURE,
      });

      throw error;
    }
  };

export default createInstrumentsFactory;
