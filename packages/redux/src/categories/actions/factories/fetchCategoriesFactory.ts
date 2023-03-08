import * as actionTypes from '../../actionTypes.js';
import {
  type Category,
  type Config,
  type GetCategories,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import categorySchema from '../../../entities/schemas/category.js';
import type { Dispatch } from 'redux';
import type { FetchCategoriesAction } from '../../types/index.js';

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
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_CATEGORIES_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchCategoriesFactory;
