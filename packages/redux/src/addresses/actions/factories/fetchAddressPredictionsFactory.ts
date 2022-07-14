import * as actionTypes from '../../actionTypes';
import { Config, toBlackoutError } from '@farfetch/blackout-client';
import type {
  AddressPredictions,
  GetAddressPredictions,
  GetAddressPredictionsQuery,
} from '@farfetch/blackout-client/src/addresses/types';
import type { Dispatch } from 'redux';
import type { FetchAddressPredictionsAction } from '../../types';

/**
 * @param text   - Inserted text.
 * @param query  - Query params.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Load Predictions based in the inserted text.
 *
 * @param getPredictions - Get predictions client.
 *
 * @returns Thunk factory.
 */
export const fetchAddressPredictionsFactory =
  (getPredictions: GetAddressPredictions) =>
  (text: string, query: GetAddressPredictionsQuery, config?: Config) =>
  async (
    dispatch: Dispatch<FetchAddressPredictionsAction>,
  ): Promise<AddressPredictions[]> => {
    try {
      dispatch({
        type: actionTypes.FETCH_ADDRESS_PREDICTIONS_REQUEST,
      });

      const result = await getPredictions(text, query, config);

      dispatch({
        payload: result,
        type: actionTypes.FETCH_ADDRESS_PREDICTIONS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_ADDRESS_PREDICTIONS_FAILURE,
      });

      throw error;
    }
  };
