import * as actionTypes from '../../actionTypes';
import {
  type AddressPredictionDetails,
  type Config,
  type GetAddressPredictionDetails,
  type GetAddressPredictionDetailsProps,
  type GetAddressPredictionDetailsQuery,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { FetchAddressPredictionDetailsAction } from '../../types';

/**
 * Load address prediction details based in the prediction id.
 *
 * @param getAddressPredictionDetails - Get address prediction details client.
 *
 * @returns Thunk factory.
 */
const fetchAddressPredictionDetailsFactory =
  (getAddressPredictionDetails: GetAddressPredictionDetails) =>
  (
    props: GetAddressPredictionDetailsProps,
    query: GetAddressPredictionDetailsQuery,
    config?: Config,
  ) =>
  async (
    dispatch: Dispatch<FetchAddressPredictionDetailsAction>,
  ): Promise<AddressPredictionDetails> => {
    try {
      dispatch({
        type: actionTypes.FETCH_ADDRESS_PREDICTION_DETAILS_REQUEST,
      });

      const result = await getAddressPredictionDetails(props, query, config);

      dispatch({
        payload: result,
        type: actionTypes.FETCH_ADDRESS_PREDICTION_DETAILS_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_ADDRESS_PREDICTION_DETAILS_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchAddressPredictionDetailsFactory;
