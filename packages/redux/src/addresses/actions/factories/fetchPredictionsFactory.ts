import {
  FETCH_PREDICTION_FAILURE,
  FETCH_PREDICTION_REQUEST,
  FETCH_PREDICTION_SUCCESS,
} from '../../actionTypes';
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
    dispatch({
      type: FETCH_PREDICTION_REQUEST,
    });

    try {
      const result = await getPredictions(text, query, config);

      dispatch({
        payload: result,
        type: FETCH_PREDICTION_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: FETCH_PREDICTION_FAILURE,
      });

      throw error;
    }
  };

export default fetchPredictionsFactory;
