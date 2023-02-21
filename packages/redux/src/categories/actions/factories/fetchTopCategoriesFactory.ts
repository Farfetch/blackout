import * as actionTypes from '../../actionTypes';
import {
  type Category,
  type Config,
  type GetCategories,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import categorySchema from '../../../entities/schemas/category';
import type { Dispatch } from 'redux';
import type { FetchTopCategoriesAction } from '../../types';

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
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_TOP_CATEGORIES_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchTopCategoriesFactory;
