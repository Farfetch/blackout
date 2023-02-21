import * as actionTypes from '../../actionTypes';
import {
  type Category,
  type Config,
  type GetCategory,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import categorySchema from '../../../entities/schemas/category';
import type { Dispatch } from 'redux';
import type { FetchCategoryAction } from '../../types';

/**
 * Creates a thunk factory configured with the specified client to fetch a
 * category by id.
 *
 * @param getCategory - Get category client.
 *
 * @returns Thunk factory.
 */
const fetchCategoryFactory =
  (getCategory: GetCategory) =>
  (id: Category['id'], config?: Config) =>
  async (dispatch: Dispatch<FetchCategoryAction>): Promise<Category> => {
    try {
      dispatch({
        meta: { id },
        type: actionTypes.FETCH_CATEGORY_REQUEST,
      });

      const result = await getCategory(id, config);

      dispatch({
        meta: { id },
        payload: normalize(result, [categorySchema]),
        type: actionTypes.FETCH_CATEGORY_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        meta: { id },
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_CATEGORY_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchCategoryFactory;
