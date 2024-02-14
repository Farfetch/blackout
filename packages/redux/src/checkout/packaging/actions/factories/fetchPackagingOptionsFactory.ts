import * as actionTypes from '../../../actionTypes.js';
import {
  type Config,
  type GetPackagingOptions,
  type GetPackagingOptionsQuery,
  type PackagingOption,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Method responsible for get all packaging options.
 *
 * @param getPackagingOptions - Get all packaging options.
 *
 * @returns Thunk factory.
 */
const fetchPackagingOptionsFactory =
  (getPackagingOptions: GetPackagingOptions) =>
  (query: GetPackagingOptionsQuery, config?: Config) =>
  async (dispatch: Dispatch): Promise<PackagingOption[]> => {
    try {
      dispatch({
        type: actionTypes.FETCH_PACKAGING_OPTIONS_REQUEST,
      });

      const result = await getPackagingOptions(query, config);

      dispatch({
        payload: result,
        type: actionTypes.FETCH_PACKAGING_OPTIONS_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_PACKAGING_OPTIONS_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchPackagingOptionsFactory;
