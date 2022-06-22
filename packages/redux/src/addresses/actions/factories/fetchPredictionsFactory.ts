import * as actionTypes from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type { FetchPredictionAction } from '../../types';
import type {
  GetPredictions,
  GetPredictionsQuery,
  Prediction,
} from '@farfetch/blackout-client/addresses/types';

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
const fetchPredictionsFactory =
  (getPredictions: GetPredictions) =>
  (text: string, query: GetPredictionsQuery, config?: Config) =>
  async (dispatch: Dispatch<FetchPredictionAction>): Promise<Prediction[]> => {
    try {
      dispatch({
        type: actionTypes.FETCH_PREDICTION_REQUEST,
      });

      const result = await getPredictions(text, query, config);

      dispatch({
        payload: result,
        type: actionTypes.FETCH_PREDICTION_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: actionTypes.FETCH_PREDICTION_FAILURE,
      });

      throw error;
    }
  };

export default fetchPredictionsFactory;
