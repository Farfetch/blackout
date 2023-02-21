import * as actionTypes from '../../actionTypes';
import {
  type AddressPrediction,
  type Config,
  type GetAddressPredictions,
  type GetAddressPredictionsQuery,
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
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_ADDRESS_PREDICTIONS_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchAddressPredictionsFactory;
