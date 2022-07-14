import * as actionTypes from '../../actionTypes';
import { Config, toBlackoutError } from '@farfetch/blackout-client';
import type {
  AddressPrediction,
  GetAddressPrediction,
  GetAddressPredictionProps,
  GetAddressPredictionQuery,
} from '@farfetch/blackout-client/src/addresses/types';
import type { Dispatch } from 'redux';
import type { FetchAddressPredictionAction } from '../../types';

/**
 * @param props  - Object containing predictionId.
 * @param query  - Query params.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Load Address details based in the prediction id.
 *
 * @param getAddressPrediction - Get prediction details client.
 *
 * @returns Thunk factory.
 */
export const fetchAddressPredictionFactory =
  (getAddressPrediction: GetAddressPrediction) =>
  (
    props: GetAddressPredictionProps,
    query: GetAddressPredictionQuery,
    config?: Config,
  ) =>
  async (
    dispatch: Dispatch<FetchAddressPredictionAction>,
  ): Promise<AddressPrediction> => {
    try {
      dispatch({
        type: actionTypes.FETCH_ADDRESS_PREDICTION_REQUEST,
      });

      const result = await getAddressPrediction(props, query, config);

      dispatch({
        payload: result,
        type: actionTypes.FETCH_ADDRESS_PREDICTION_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_ADDRESS_PREDICTION_FAILURE,
      });

      throw error;
    }
  };
