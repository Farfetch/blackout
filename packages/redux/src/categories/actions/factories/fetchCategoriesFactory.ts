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
import type { FetchCategoriesAction } from '../../types';

/**
 * Creates a thunk factory configured with the specified client to fetch all
 * categories.
 *
 * @param getCategories - Get categories client.
 *
 * @returns Thunk factory.
 */
const fetchCategoriesFactory =
  (getCategories: GetCategories) =>
  (config?: Config) =>
  async (dispatch: Dispatch<FetchCategoriesAction>): Promise<Category[]> => {
    try {
      dispatch({
        type: actionTypes.FETCH_CATEGORIES_REQUEST,
      });

      const result = await getCategories(config);

      dispatch({
        payload: normalize(result, [categorySchema]),
        type: actionTypes.FETCH_CATEGORIES_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_CATEGORIES_FAILURE,
      });

      throw error;
    }
  };

export default fetchCategoriesFactory;
