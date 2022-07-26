import * as actionTypes from '../../actionTypes';
import {
  AddressPrediction,
  Config,
  GetAddressPredictions,
  GetAddressPredictionsQuery,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { FetchAddressPredictionsAction } from '../../types';

/**
 * Load Predictions based in the inserted text.
 *
 * @param getAddressPredictions - Get address predictions client.
 *
 * @returns Thunk factory.
 */
const fetchAddressPredictionsFactory =
  (getAddressPredictions: GetAddressPredictions) =>
  (text: string, query?: GetAddressPredictionsQuery, config?: Config) =>
  async (
    dispatch: Dispatch<FetchAddressPredictionsAction>,
  ): Promise<AddressPrediction[]> => {
    try {
      dispatch({
        type: actionTypes.FETCH_ADDRESS_PREDICTIONS_REQUEST,
      });

      const result = await getAddressPredictions(text, query, config);

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

export default fetchAddressPredictionsFactory;
