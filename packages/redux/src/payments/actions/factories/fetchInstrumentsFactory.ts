import * as actionTypes from '../../actionTypes';
import { normalize } from 'normalizr';
import { toError } from '@farfetch/blackout-client/helpers/client';
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
 * @param id     - Id of the payment Intent.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Obtains all the intent instruments that will process on demand.
 *
 * @param getInstruments - Get instruments client.
 *
 * @returns Thunk factory.
 */

const fetchInstrumentsFactory =
  (getInstruments: GetInstruments) =>
  (id: Intent['id'], config?: Config) =>
  async (dispatch: Dispatch<FetchInstrumentsAction>): Promise<Instruments> => {
    try {
      dispatch({
        type: actionTypes.FETCH_INSTRUMENTS_REQUEST,
      });

      const result = await getInstruments(id, config);

      dispatch({
        payload: normalize(result, [instrumentSchema]),
        type: actionTypes.FETCH_INSTRUMENTS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: actionTypes.FETCH_INSTRUMENTS_FAILURE,
      });

      throw error;
    }
  };

export default fetchInstrumentsFactory;
