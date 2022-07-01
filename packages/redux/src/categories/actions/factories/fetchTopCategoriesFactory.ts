import * as actionTypes from '../../actionTypes';
import {
  Category,
  Config,
  GetCategories,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import categorySchema from '../../../entities/schemas/category';
import type { Dispatch } from 'redux';
import type { FetchTopCategoriesAction } from '../../types';

/**
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client to fetch all top
 * categories.
 *
 * @param getTopCategories - Get categories top client.
 *
 * @returns Thunk factory.
 */
const fetchTopCategoriesFactory =
  (getTopCategories: GetCategories) =>
  (config?: Config) =>
  async (dispatch: Dispatch<FetchTopCategoriesAction>): Promise<Category[]> => {
    try {
      dispatch({
        type: actionTypes.FETCH_TOP_CATEGORIES_REQUEST,
      });

      const result = await getTopCategories(config);

      dispatch({
        payload: normalize(result, [categorySchema]),
        type: actionTypes.FETCH_TOP_CATEGORIES_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_TOP_CATEGORIES_FAILURE,
      });

      throw error;
    }
  };

export default fetchTopCategoriesFactory;
